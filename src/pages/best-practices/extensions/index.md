---
title: Extension Coding | Commerce PHP Extensions
description: Review coding best practices for Adobe Commerce and Magento Open Source extensions.
keywords:
  - Extensions
---

# Extension coding

The coding best practices presented in this section should be known and understood by you, the developer, when creating or maintaining your extensions. This ensures that the extension you develop behaves and functions correctly within the application architecture. This guide is not only meant to educate you about coding best practices, but to also highlight some pitfalls we have seen other extension developers fall into so that you may avoid them.

For in depth content about creating extensions, see the [PHP Developer Guide](../../development/index.md).

You should follow common programming best practices to reduce bugs and improve the quality and maintainability of your extensions.

The following list of best practices addresses commonly reported issues in third-party extensions.

### Follow a set of coding standards

Coding standards are a set of guidelines that describe how code should be written. These standards define coding practices that determine the style of the code. Whether you are a solo developer or part of a team, following a set of coding standards will help make your code consistent and maintainable.

[Coding Standards](../../coding-standards/index.md) are based on the following:

*  [Zend Coding standards](https://framework.zend.com/manual/1.12/en/coding-standard.html)
*  [PSR2](https://www.php-fig.org/psr/psr-2/)
*  [PSR4](https://www.php-fig.org/psr/psr-4/)

To help you stick to coding standards, we recommend using the [PHP_CodeSniffer tool](https://github.com/squizlabs/PHP_CodeSniffer).

### Write and utilize reusable code

Avoid using redundant or duplicate code, which can be hard to maintain. Instead of copying and pasting the same code throughout your extension, create a single class or method and reference it when needed.

As a general rule, reuse code as much as possible to prevent code duplication.

The code you write should be small, focused, and provide a generic solution. This will help you reuse code in future development.

### Design your code to be replaceable

Designing and writing your code to be replaceable is just as important as making it reusable. Having a replaceable design means your code is modular and loosely coupled, which makes updates and improvements easier.

It is common practice to replace parts of your codebase with newer and better pieces as bugs are found or newer strategies become available. Writing replaceable code in your codebase makes this practice easier and more efficient.

### Avoid creating helper classes

Helper or utility classes are classes filled with static methods that do not quite fit anywhere else. These classes are considered an anti-pattern and violate the principles of object-oriented programming.

If you have `ClassA` and a `ClassAHelper` with static functions that work on `ClassA`, you should consider refactoring those functions into `ClassA`.

A helper class that functions as a catch-all for random methods violates the single responsibility principle because it is an attempt to solve multiple problems in a single class. You should refactor your code and move those functions into the appropriate classes.

### Be consistent with case and naming conventions

You should be consistent in your naming conventions for files, folder names, classes, and methods. Following standard conventions makes your code easier to read and look professional.

Not following this practice is a code standards violation and impacts your extension's readability and  maintainability.

### Composition over inheritance

[Class inheritance](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)) is the object-oriented programming concept that deals with code reuse and extending the behavior of a base class, which was preferred for Magento 1 development.

[Object composition](https://en.wikipedia.org/wiki/Object_composition) is the programming concept of combining class objects and data types to create a more complex class. The classes and data types are used together to produce a desired functionality.

For Magento 2 extension development, we encourage the use of object composition over class inheritance. Using composition over inheritance makes your extension easier to maintain when class changes occur and update when new features need to be implemented.

### Using around plugins

Avoid using [around method plugins](../../development/components/plugins.md) when they are not required because they increase stack traces and affect performance. The only use case for around method plugins is when you need to terminate the execution of all further plugins and original methods.

<InlineAlert variant="info" slots="text"/>

Access to method parameters was the primary justification for using **around** method plugins instead of **after** method plugins. Since 2.2, [after method plugins](../../development/components/plugins.md#after-methods) give you access to method parameters. Use **after** method plugins if you need to replace or modify function results using arguments.

### Test your code

Write testable code and follow the [Testing Guide](https://developer.adobe.com/commerce/testing/guide/) to create tests for your code.

Tests help describe what your code does under different conditions and define its functionality. Make sure your tests cover a variety of conditions to prevent the introduction of bugs when you add new code.
