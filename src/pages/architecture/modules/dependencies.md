---
title: Module Dependencies | Commerce PHP Extensions
description: Learn about the two types of module dependencies in the Commerce framework; hard and soft.
keywords:
  - Extensions
---

# Module dependencies

A *software dependency* identifies  one software component's reliance on another for proper functioning. A core principle of the Adobe Commerce and Magento Open Source framework (Commerce framework) architecture is the **minimization of software dependencies**. Instead of being closely interrelated with other modules, modules are optimally designed to be *loosely coupled*. Loosely coupled modules require little or no knowledge of other modules to perform their tasks.

Each module is responsible for a unique feature. In practice, this means that:

*  Several modules cannot be responsible for one feature.

*  One module cannot be responsible for several features.

*  Module dependencies on other modules must be declared explicitly. You must also declare any dependency upon other components (for example, a theme, language package, or library).

*  Removing or disabling a module does not result in disabling other modules.

## Dependency types

There are two types of module dependencies: hard and soft.

### Hard dependencies

A module with a *hard dependency* on another module cannot function without the module it depends on. These modules:

*  Contain code that directly uses logic from another module, such as class constants, static methods, public class properties, interfaces, and traits.
*  Contain strings that include class names, method names, class constants, class properties, interfaces, and traits from another module.
*  Deserializes an object declared in another module.
*  Uses or modifies the database tables used by another module.

The `require` section of `app/code/<Vendor>/<Module>/composer.json` file contains hard dependency definitions for the module. For example:

```json
  ...
  "require": {
    "magento/module-catalog": "103.0.*",
    "magento/module-email": "101.0.*",
    "magento/module-media-storage": "100.3.*",
    "magento/module-store": "101.0.*",
    "magento/module-theme": "101.0.*",
    "magento/module-ui": "101.1.*",
    "magento/module-variable": "100.3.*",
    "magento/module-widget": "101.1.*",
    "magento/module-authorization": "100.3.*"
   }
   ...
```

### Soft dependencies

A module with a *soft dependency* on another module can function properly without the other module, even if it has a dependency on the other module. These modules:

*  Directly check another module's availability.
*  Extend another module's configuration.
*  Extend another module's layout.

The `suggest` section of `app/code/<Vendor>/<Module>/composer.json` file contains soft dependency definitions for the module. For example:

```json
  ...
  "suggest": {
    "magento/module-graph-ql": "*",
    "magento/module-graph-ql-cache": "*",
    "magento/module-store-graph-ql": "*"
  }
   ...
```

The `<sequence>` node of `app/code/<Vendor>/<Module>/etc/module.xml` file also contains soft dependency definitions for the module. For example:

```xml
  <module name="Magento_Cms">
    <sequence>
      <module name="Magento_Store"/>
      <module name="Magento_Theme"/>
      <module name="Magento_Variable"/>
    </sequence>
  </module>
```

<InlineAlert variant="success" slots="text"/>

If a module uses code from another module, it should declare the dependency explicitly.

## Module install order

The Commerce framework installs modules in the following order:

1. The module serving as a dependency for another module
1. The module dependent on it

## Appropriate dependencies

Although the Commerce framework architecture favors loosely coupled software components, modules can contain dependencies upon these software components:

*  other modules

*  PHP extensions

*  libraries (either Commerce framework library or third party libraries)

<InlineAlert variant="info" slots="text"/>

You can lose the historical information contained in a module if the module is removed or disabled. We recommend alternative storage of module information before you remove or disable a module.

## Inappropriate dependencies

Avoid creating these dependencies:

*  Circular (both direct and indirect)
*  Undeclared
*  Incorrect

## Dependencies between modules in different presentation layers

You can build dependencies between the modules belonging to different layers.

## Dependencies in the Framework layer

A module belonging to the Commerce framework can be used in the application layer by an explicit dependency.

<InlineAlert variant="success" slots="text"/>

In this case, using interfaces is preferable to using classes. You can build dependencies between classes in the Commerce framework even if they belong to different modules.

## Dependencies in the application layer

A module belonging to the application layer cannot be used in the Commerce framework.

You can build dependencies between classes in the application layer, but these classes must belong to the same module. Dependencies between the modules of the application layer should be built only by the service contract or the service provider interface (SPI).

## Managing module dependencies

At a high level, there are three main steps for managing module dependencies:

1. Name and declare the module in the `module.xml` file.

1. Declare any dependencies that the module has (whether on other modules or on a different component) in the module's `composer.json` file.

1. (*Optional*) Define the desired load order of config files and `.css` files in the `module.xml` file.

Example: Module A declares a dependency upon Module B. Thus, in Module A's `module.xml` file, Module B is listed in the `<sequence>` list, so that B's files are loaded before A's. Additionally, you must declare a dependency upon Module B in A's `composer.json` file. Furthermore, in the [deployment configuration](https://experienceleague.adobe.com/en/docs/commerce-operations/configuration-guide/files/deployment-files), Modules A and B must both be defined as enabled.

`etc/module.xml`

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd">
    <module name="Module_A" setup_version="1.0.0">
        <sequence>
            <module name="Module_B" />
        </sequence>
    </module>
</config>
```

After installing the module and opening `app/etc/config.php`, you are able to see that the Module_B was loaded before Module_A:

```php
return [
    'modules' => [
        ...
        'Module_B' => 1,
        'Module_A' => 1,
        ...
    ]
];
```
