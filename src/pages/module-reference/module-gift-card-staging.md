---
title: GiftCardStaging
description: N/A
---

# Magento_GiftCardStaging module

The Magento_GiftCardStaging module is a part of the staging functionality in Magento EE. It enables you to create new GiftCard Product updates or add new changes to the existing store updates. In other words, you can modify the GiftCard Product entity attributes in updates. These updates are shown on the content dashboard.

## Implementation details

The Magento_GiftCardStaging module changes the GiftCard Product creation page to make them compatible with the Magento Staging Framework:

- Adds the Amount field set to the Schedule Update form
- Provides functionality of the field set
- Returns Amounts values to the initial state after update is finished

## Dependencies

You can find the list of modules that have dependencies on the Magento_GiftCardStaging module in the `require` section of the `composer.json` file. The file is located in the root directory of the module.

## Extension points

Extension points enable extension developers to interact with the Magento_GiftCardStaging module. For more information about the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_GiftCardStaging module.

<InlineAlert slots="text" />
The version of this module is 100.4.5.
