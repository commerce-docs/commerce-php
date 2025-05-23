---
title: Plugins | Commerce PHP Extensions
description: Modify the behavior of public class functions in Adobe Commerce and Magento Open Source using plugin (or interceptor) classes.
keywords:
  - Extensions
---

# Plugins

A plugin, or interceptor, is a class that modifies the behavior of public class functions by intercepting a function call and running code before, after, or around that function call. This allows you to *substitute* or *extend* the behavior of original, public methods for any *class* or *interface*.

Extensions that wish to intercept and change the behavior of a *public method* can create a `Plugin` class.

This interception approach reduces conflicts among extensions that change the behavior of the same class or method. Your `Plugin` class implementation changes the behavior of a class function, but it does not change the class itself. Adobe Commerce and Magento Open Source call these interceptors sequentially according to a configured sort order, so they do not conflict with one another.

## Limitations

Plugins can not be used on following:

*  Final methods
*  Final classes
*  Non-public methods
*  Class methods (such as static methods)
*  `__construct` and `__destruct`
*  Virtual types
*  Objects that are instantiated before `Magento\Framework\Interception` is bootstrapped
*  Objects that implement `Magento\Framework\ObjectManager\NoninterceptableInterface`

## Declaring a plugin

The `di.xml` file in your module declares a plugin for a class object:

```xml
<config>
    <type name="{ObservedType}">
      <plugin name="{pluginName}" type="{PluginClassName}" sortOrder="1" disabled="false" />
    </type>
</config>
```

You must specify these elements:

*  `type name`. A class or interface which the plugin observes.
*  `plugin name`. An arbitrary plugin name that identifies a plugin. Also used to merge the configurations for the plugin.
*  `plugin type`. The name of a plugin's class or its virtual type. Use the following naming convention when you specify this element: `\Vendor\Module\Plugin\<ClassName>`.

The following elements are optional:

*  `plugin sortOrder`. Plugins that call the same method run them using this order.
*  `plugin disabled`. To disable a plugin, set this element to `true`. The default value is `false`.

### Defining a plugin

By applying code before, after, or around a public method, a plugin extends or modifies that method's behavior.

The first argument for the before, after, and around methods is an object that provides access to all public methods of the observed method's class.

### Plugin method naming convention

It is a best practice to capitalize the first letter of the class method name for which you want to create a plugin before adding `before`, `around` or `after` prefixes to it.

For example, to create a plugin for the `setName` method of some class:

```php
...
    public function setName($name)
    {
        ...
    }
...
```

In the plugin class, the `setName` method may have one of the following names:

*  `beforeSetName`
*  `aroundSetName`
*  `afterSetName`

If the first letter in the name of the class method name for which you want to create a plugin is the `underscore` character, then you do not need to capitalize it in the plugin class.

For example, to create a plugin for the `_construct` method of some class:

```php
...
    public function _construct()
    {
        ...
    }
...
```

Use the following method names for the `_construct` method in the plugin class:

*  `before_construct`
*  `around_construct`
*  `after_construct`

## Before methods

The application runs all before methods ahead of the call to an observed method. These methods must have the same name as the observed method with 'before' as the prefix.

You can use before methods to change the arguments of an observed method by returning a modified argument. If there are any arguments, the method should return an array of those arguments. If the method does not change the argument for the observed method, it should return a `null` value.

Below is an example of a before method modifying the `$name` argument before passing it on to the observed `setName` method.

```php
<?php
/**
 * Copyright [first year code created] Adobe
 * All rights reserved.
 */

namespace My\Module\Plugin;

use Magento\Catalog\Model\Product;

class ProductAttributesUpdater
{
    public function beforeSetName(Product $subject, $name)
    {
        return ['(' . $name . ')'];
    }
}
```

## After methods

The application runs all after methods following the completion of the observed method. The application requires these methods have a return value and they must have the same name as the observed method with 'after' as the prefix.

You can use these methods to change the result of an observed method by modifying the original result and returning it at the end of the method.

Below is an example of an after method modifying the return value `$result` of an observed methods call.

```php
<?php
/**
 * Copyright [first year code created] Adobe
 * All rights reserved.
 */

namespace My\Module\Plugin;

use Magento\Catalog\Model\Product;

class ProductAttributesUpdater
{
    public function afterGetName(Product $subject, $result)
    {
        return '|' . $result . '|';
    }
}
```

The after methods have access to all the arguments of their observed methods. When the observed method completes, the application passes the result and arguments to the next after method that follows. If the observed method does not return a result (`@return void`), then it passes a `null` value to the next after method.

Below is an example of an after method that accepts the `null` result and arguments from the observed `login` method for [`Magento\Backend\Model\Auth`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Backend/Model/Auth.php):

```php
<?php
/**
 * Copyright [first year code created] Adobe
 * All rights reserved.
 */

namespace My\Module\Plugin;

use Magento\Backend\Model\Auth;
use Psr\Log\LoggerInterface;

class AuthLogger
{
    private $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    /**
     * @param Auth $authModel
     * @param null $result
     * @param string $username
     * @return void
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     */
    public function afterLogin(Auth $authModel, $result, $username)
    {
        $this->logger->debug('User ' . $username . ' signed in.');
    }
}
```

After methods do not need to declare all the arguments of their observed methods except those that the method uses and any arguments from the observed method that come before those used arguments.

The following example is a class with an after method for [`\Magento\Catalog\Model\Product\Action::updateWebsites($productIds, $websiteIds, $type)`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Catalog/Model/Product/Action.php):

```php
<?php
/**
 * Copyright [first year code created] Adobe
 * All rights reserved.
 */

use Psr\Log\LoggerInterface;
use Magento\Catalog\Model\Product\Action;

class WebsitesLogger
{
    private $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function afterUpdateWebsites(Action $subject, $result, $productIds, $websiteIds)
    {
        $this->logger->log('Updated websites: ' . implode(', ',  $websiteIds));
    }
}

```

In the example, the `afterUpdateWebsites` function uses the variable `$websiteIds`, so it declares that variable as an argument. It also declares `$productIds` because it comes before `$websiteIds` in the parameter signature of the observed method. The after method did not list `$type` because it did not use it inside the method nor does it come before `$websiteIds`.

<InlineAlert variant="warning" slots="text"/>

If an argument is optional in the observed method, then the after method should also declare it as optional.

## Around methods

The application runs the code in around methods before and after their observed methods. Using these methods allow you to override an observed method. Around methods must have the same name as the observed method with 'around' as the prefix.

<InlineAlert variant="warning" slots="text"/>

Avoid using around method plugins when they are not required because they increase stack traces and affect performance.
The only use case for around method plugins is when the execution of all further plugins and original methods need termination.
Use after method plugins if you require arguments for replacing or altering function results.

Before the list of the original method's arguments, around methods receive a `callable` that will allow a call to the next method in the chain. When your code executes the `callable`, the application calls the next plugin or the observed function.

<InlineAlert variant="warning" slots="text"/>

If the around method does not call the `callable`, it will prevent the execution of all the plugins next in the chain and the original method call.

Below is an example of an around method adding behavior before and after an observed method:

```php
<?php
/**
 * Copyright [first year code created] Adobe
 * All rights reserved.
 */

namespace My\Module\Plugin;

use Magento\Catalog\Model\Product;

class ProductAttributesUpdater
{
    public function aroundSave(Product $subject, callable $proceed)
    {
        $someValue = $this->doSmthBeforeProductIsSaved();
        $returnValue = null;

        if ($this->canCallProceedCallable($someValue)) {
            $returnValue = $proceed();
        }

        if ($returnValue) {
            $this->postProductToFacebook();
        }

        return $returnValue;
    }
}
```

When you wrap a method which accepts arguments, your plugin must accept those arguments and you must forward them when you invoke the `proceed` callable. You must be careful to match the default parameters and type hints of the original signature of the method.

For example, the following code defines a parameter of type `SomeType`, which is nullable:

```php
<?php
/**
 * Copyright [first year code created] Adobe
 * All rights reserved.
 */

namespace My\Module\Model;

class MyUtility
{
    public function save(SomeType $obj = null)
    {
        //do something
    }
}
```

You should wrap this method with a plugin:

```php
<?php
/**
 * Copyright [first year code created] Adobe
 * All rights reserved.
 */

namespace My\Module\Plugin;

use My\Module\Model\MyUtility;

class MyUtilityUpdater
{
    public function aroundSave(MyUtility $subject, callable $proceed, SomeType $obj = null)
    {
        //do something
    }
}
```

Note if you miss `= null` and the applicationcalls the original method with `null`, PHP would throw a fatal error as your plugin does not accept `null`.

You are responsible for forwarding the arguments from the plugin to the `proceed` callable. If you are not using/modifying the arguments, you could use variadics and argument unpacking to achieve this:

```php
<?php
/**
 * Copyright [first year code created] Adobe
 * All rights reserved.
 */

namespace My\Module\Plugin;

use My\Module\Model\MyUtility;

class MyUtilityUpdater
{
    public function aroundSave(MyUtility $subject, callable $proceed, ...$args)
    {
        //do something
        $proceed(...$args);
    }
}
```

## Prioritizing plugins

The `sortOrder` property from the `plugin` node declared in `di.xml` determines the plugin's prioritization when more than one plugin is observing the same method.

The [`Magento\Framework\Interception\PluginListInterface`](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/Interception/PluginListInterface.php) which is implemented by [`Magento\Framework\Interception\PluginList\PluginList`](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/Interception/PluginList/PluginList.php) is responsible to define when to call the before, around, or after methods respecting this prioritization.

If two or more plugins have the same `sortOrder` value or do not specify it, the [component load order](../build/component-load-order.md) declared in the `sequence` node from `module.xml` and [area](../build/schema-validation.md) will define the merge sequence. Check the component load order in `app/etc/config.php` file.

The application executes plugins using these rules during each plugin execution in two main flows:

*  Before the execution of the observed method, starting from lowest to highest `sortOrder`.
   *  The application executes the current plugin's `before` method.
   *  Then the current plugin's `around` method is called.
      *  The first part of the plugin's `around` method is executed.
      *  The `around` method executes the `callable`.
         *  If there is another plugin in the chain, all subsequent plugins are wrapped in an independent sequence loop and the execution starts another flow.
         *  If the current plugin is the last in the chain, the observed method is executed.
      *  The second part of the `around` method is executed.
   *  The application moves on to the next plugin.

*  Following the execution flow, starting from lowest to highest `sortOrder` in the current sequence plugins loop.
   *  The current plugin's `after` method is executed.
   *  The application moves on to the next plugin.

As a result of these rules, the execution flow of an observed method is affected not only by the prioritization of the plugins, but also by their implemented methods.

<InlineAlert variant="info" slots="text"/>

The `around` plugin's method affects the flow of all plugins that are executed after it.

<InlineAlert variant="success" slots="text"/>

When the `before` and `around` plugin sequence is finished, the application calls the first plugin `after` method in the sequence loop, and not the `after` method of the current plugin that was being executed by the `around` method.

### Examples

For example, the `di.xml` file of your module attaches three plugins for the class `Action`:

```xml
<config>
    <type name="Magento\Framework\App\Action\Action">
        <plugin name="vendor_module_plugina" type="Vendor\Module\Plugin\PluginA" sortOrder="10" />
        <plugin name="vendor_module_pluginb" type="Vendor\Module\Plugin\PluginB" sortOrder="20" />
        <plugin name="vendor_module_pluginc" type="Vendor\Module\Plugin\PluginC" sortOrder="30" />
    </type>
</config>
```

The execution will have a different flow, depending on the methods implemented by these classes, as explained in the following scenarios.

#### Scenario A

With these methods:

|               | PluginA          | PluginB          | PluginC          |
|  ------------ | ---------------- | ---------------- | ---------------- |
| **sortOrder** | 10               | 20               | 30               |
| **before**    | beforeDispatch() | beforeDispatch() | beforeDispatch() |
| **around**    |                  |                  |                  |
| **after**     | afterDispatch()  | afterDispatch()  | afterDispatch()  |

The execution will be in this order:

*  `PluginA::beforeDispatch()`
*  `PluginB::beforeDispatch()`
*  `PluginC::beforeDispatch()`

   *  `Action::dispatch()`

*  `PluginA::afterDispatch()`
*  `PluginB::afterDispatch()`
*  `PluginC::afterDispatch()`

#### Scenario B (with a `callable` around)

With these methods:

|               | PluginA          | PluginB          | PluginC          |
| -----------   | --------------   | --------------   | --------------   |
| **sortOrder** | 10               | 20               | 30               |
| **before**    | beforeDispatch() | beforeDispatch() | beforeDispatch() |
| **around**    |                  | aroundDispatch() |                  |
| **after**     | afterDispatch()  | afterDispatch()  | afterDispatch()  |

`PluginB`::`aroundDispatch()` defines the [$next](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/Interception/Interceptor.php) argument with a `callable` type. For example:

```php
<?php
/**
 * Copyright [first year code created] Adobe
 * All rights reserved.
 */

use Magento\Framework\App\Action\Action;

class PluginB
{
    public function aroundDispatch(Action $subject, callable $next, ...$args)
    {
        // The first half of code goes here
        // ...

        $result = $next(...$args);

        // The second half of code goes here
        // ...

        return $result;
    }
}
```

The execution will be in this order:

*  `PluginA::beforeDispatch()`
*  `PluginB::beforeDispatch()`
*  `PluginB::aroundDispatch()` (the application calls the first half before `callable`)

   *  `PluginC::beforeDispatch()`

      *  `Action::dispatch()`

   *  `PluginC::afterDispatch()`

*  `PluginB::aroundDispatch()` (the applicationcalls the second half after `callable`)
*  `PluginA::afterDispatch()`
*  `PluginB::afterDispatch()`

#### Scenario B (without a `callable` around)

Using these methods:

|               | PluginA          | PluginB          | PluginC          |
| -----------   | --------------   | --------------   | --------------   |
| **sortOrder** | 10               | 20               | 30               |
| **before**    | beforeDispatch() | beforeDispatch() | beforeDispatch() |
| **around**    |                  | aroundDispatch() |                  |
| **after**     | afterDispatch()  | afterDispatch()  | afterDispatch()  |

`PluginB`::`aroundDispatch()` does not define the [$next](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/Interception/Interceptor.php) argument with a `callable` type. For example:

```php
<?php
/**
 * Copyright [first year code created] Adobe
 * All rights reserved.
 */

use Magento\Framework\App\Action\Action;

class PluginB
{
    public function aroundDispatch(Action $subject, $next, $result)
    {
        // My custom code
        return $result;
    }
}
```

The execution will be in this order:

*  `PluginA::beforeDispatch()`
*  `PluginB::beforeDispatch()`

   *  `PluginB::aroundDispatch()`

*  `PluginA::afterDispatch()`
*  `PluginB::afterDispatch()`

Because the`callable` type for the `$next` agrument is absent, `Action::dispatch()` will be not called and `Plugin C` will be not triggered.

#### Scenario C

Assuming these methods:

|               | PluginA          | PluginB          | PluginC          |
| ------------- | ---------------- | ---------------- | ---------------- |
| **sortOrder** | 10               | 20               | 30               |
| **before**    | beforeDispatch() | beforeDispatch() | beforeDispatch() |
| **around**    | aroundDispatch() |                  | aroundDispatch() |
| **after**     | afterDispatch()  | afterDispatch()  | afterDispatch()  |

The execution will be in this order:

*  `PluginA::beforeDispatch()`
*  `PluginA::aroundDispatch()` (the application calls the first half until `callable`)

   *  `PluginB::beforeDispatch()`
   *  `PluginC::beforeDispatch()`
   *  `PluginC::aroundDispatch()` (the application calls the first half until `callable`)

      *  `Action::dispatch()`

   *  `PluginC::aroundDispatch()` (the application calls the second half after `callable`)
   *  `PluginB::afterDispatch()`
   *  `PluginC::afterDispatch()`

*  `PluginA::aroundDispatch()` (the application calls the second half after `callable`)
*  `PluginA::afterDispatch()`

## Configuration inheritance

Classes and interfaces that are implementations of, or inherit from, classes that have plugins will also inherit plugins from the parent class.

The application uses plugins defined in the global scope when the system is in a specific area (such as frontend or backend). You can extend or override these global plugin configurations with an area's `di.xml` file.

For example, the developer can disable a global plugin in the backend area by disabling it in the specific `di.xml` file for the backend area.

### Disabling plugins

Plugins can be disabled in a `di.xml` file. To disable a plugin, set the `disabled` parameter of the plugin declaration  to `true`.

```xml
<type name="Magento\Checkout\Block\Checkout\LayoutProcessor">
    <plugin name="ProcessPaymentConfiguration" disabled="true"/>
</type>
```

where `ProcessPaymentConfiguration` is the name of the plugin declared in the `vendor/magento/module-payment/etc/frontend/di.xml`.

Note that the same class can be called two ways: with the leading slash or without.

`\Magento\Checkout\Block\Checkout\LayoutProcessor`

and

`Magento\Checkout\Block\Checkout\LayoutProcessor`

are both valid.

When disabling the plugin, make sure to use the same path format to call and disable the plugin.
