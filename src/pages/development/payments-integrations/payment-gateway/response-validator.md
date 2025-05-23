---
title: Response Validator
description: Learn how to verify gateway response for formatting, security, and execution.
keywords:
  - Extensions
  - Integration
  - Payments
---

import Docs from '/src/_includes/braintree-note.md'

<Docs />

# Response Validator

Response Validator is a component of the Adobe Commerce payment provider gateway that performs gateway response verification. This may include low level data formatting, security verification, and even execution of some business logic required by the store configuration.

Response Validator returns a Result object, containing validation result as Boolean value and errors description as a list of [Phrase](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/Phrase.php).

## Interfaces

Response Validator must implement [`Magento\Payment\Gateway\Validator\ValidatorInterface`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Payment/Gateway/Validator/ValidatorInterface.php)

Result class must implement [`Magento\Payment\Gateway\Validator\ResultInterface`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Payment/Gateway/Validator/ResultInterface.php)

A payment provider integration can have multiple response validators, that should be added to the provider's validator's pool using [dependency injection](../../components/dependency-injection.md).

## Useful implementations

-  [\Magento\Payment\Gateway\Validator\AbstractValidator](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Payment/Gateway/Validator/AbstractValidator.php): an abstract class with ability to create a Result object. Can be inherited from by particular response validator implementations.

-  [\Magento\Payment\Gateway\Validator\ValidatorComposite](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Payment/Gateway/Validator/ValidatorComposite.php): a chain of Validator objects, which are executed one by one and the result gets aggregated into one Result object. This chain can be configured to stop when certain validators fail.

-  [\Magento\Payment\Gateway\Validator\Result](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Payment/Gateway/Validator/Result.php): base class for Result object. You still have an ability to create a Result of your own, but the default one covers the most amount of cases.

## Example

In the following example a response validator is implemented and added to the pool of the Braintree payment provider request validators.

```php
class AcceptValidator extends AbstractValidator
{
    /**
     * Performs domain-related validation for business object
     *
     * @param array $validationSubject
     * @return ResultInterface
     */
    public function validate(array $validationSubject)
    {
        $response = SubjectReader::readResponse($validationSubject);
        $paymentDO = SubjectReader::readPayment($validationSubject);

        $isValid = true;
        $fails = [];

        $statements = [
            [
                $paymentDO->getOrder()->getCurrencyCode() === $response['authCurrency'],
                __('Currency doesn\'t match.')
            ],
            [
                sprintf(
                    '%.2F',
                    $paymentDO->getOrder()->getGrandTotalAmount()) === $response['authCost'],
                    __('Amount doesn\'t match.'
                )
            ],
            [
                in_array($response['authMode'], ['A', 'E']),
                __('Not supported response.')
            ]
        ];

        foreach ($statements as $statementResult) {
            if (!$statementResult[0]) {
                $isValid = false;
                $fails[] = $statementResult[1];
            }
        }

        return $this->createResult($isValid, $fails);
    }
}
```

Now, the newly added validator should be specified for a specific command. Below is an example of specifying a validator for an authorization command:

```xml
...
<virtualType name="BraintreeAuthorizeCommand" type="Magento\Payment\Gateway\Command\GatewayCommand">
    <arguments>
        ...
        <argument name="validator" xsi:type="object">Magento\Braintree\Gateway\Validator\AcceptValidator</argument>
    </arguments>
</virtualType>
...
```

(This code sample was created for demonstration purposes only, it differs from the actual Braintree configuration).
