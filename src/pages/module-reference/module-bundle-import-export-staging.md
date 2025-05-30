---
title: BundleImportExportStaging
description: N/A
---

# Magento_BundleImportExportStaging module

The Magento_BundleImportExportStaging module is a part of the staging functionality in Magento EE. It extends the Magento_BundleImportExport module functionality to be used in staging mode.

## Implementation Details

The Magento_BundleImportExportStaging module:

- adds plugin on `\Magento\BundleImportExport\Model\Import\Product\Type\Bundle\RelationsDataSaver` to add sequence information to bundle product relations (options, selections, etc.)

## Dependencies

You can find the list of modules the Magento_BundleImportExportStaging module depends on in the `require` section of the `composer.json` file located in the same directory as this `README.md` file.

## Extension Points

The Magento_BundleImportExportStaging module does not provide any specific extension points.

## Additional information

For more Magento 2 developer documentation, see [Adobe Commerce Developer Documentation](https://developer.adobe.com/commerce/docs/).

<InlineAlert slots="text" />
The version of this module is 100.4.5.
