"use strict";(self.webpackChunkcommerce_php=self.webpackChunkcommerce_php||[]).push([[28104],{9930:function(e,n,t){t.r(n),t.d(n,{_frontmatter:function(){return d},default:function(){return p}});var a=t(87462),i=t(63366),o=(t(15007),t(64983)),l=t(91515),s=["components"],d={},r={_frontmatter:d},m=l.Z;function p(e){var n=e.components,t=(0,i.Z)(e,s);return(0,o.mdx)(m,(0,a.Z)({},r,t,{components:n,mdxType:"MDXLayout"}),(0,o.mdx)("h1",{id:"inventory-management"},"Inventory Management"),(0,o.mdx)("p",null,"Adobe Commerce and Magento Open Source are highly modular systems that allow third-party developers to extend and customize the system on many levels. As a result, a developer can replace or add any component (module) without affecting the rest of the system."),(0,o.mdx)("p",null,"Module interchangeability was one of the main reasons behind introducing ",(0,o.mdx)("a",{parentName:"p",href:"../layers/service.md"},"Service Layer"),". By using service contracts and providing extensions over them, third-party developers can:"),(0,o.mdx)("ul",null,(0,o.mdx)("li",{parentName:"ul"},"Enhance out-of-the-box business logic"),(0,o.mdx)("li",{parentName:"ul"},"Replace a module without breaking the system or other extensions relying on these contracts")),(0,o.mdx)("p",null,"A set of interfaces in a module's ",(0,o.mdx)("inlineCode",{parentName:"p"},"/Api")," directory typically define the service contracts, including the APIs and their implementations. A module interface expresses the elements (entity interfaces and services to manipulate them) that the module requires. These elements defined in the interface represent a gateway for communication between modules. The implementation contains the working business logic that corresponds to the elements declared in the interface."),(0,o.mdx)("p",null,"By placing service contracts (APIs), implementations, and UI code in the same module, the application combines different architectural layers of the system in the scope of one component. Unfortunately, this means that a developer who wants to tweak a module's UI would be changing the same module as another developer who would like to substitute the implementation for predefined business logic. Even modules that the developer expects to be used in headless installations (those that don't use the Admin at all) must contain UI code."),(0,o.mdx)("h2",{id:"inventory-management-service-layer"},"Inventory management service layer"),(0,o.mdx)("p",null,"Implementing a good modular architecture means maintaining a loose coupling between components of the system, reducing dependencies on components that are not needed for a particular deployment. To allow modules to be swapped out, we have designed the Inventory Management modules to follow the ",(0,o.mdx)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Single_responsibility_principle"},"single responsibility principle")," (SRP). Each module has responsibility over a single part of the functionality, and all of its services are narrowly aligned with that responsibility."),(0,o.mdx)("p",null,"As a result of applying SRP to module responsibilities (while taking into account the multi-layered application architecture), Inventory Management is comprised of independent modules responsible for:"),(0,o.mdx)("ul",null,(0,o.mdx)("li",{parentName:"ul"},"Service contract APIs"),(0,o.mdx)("li",{parentName:"ul"},"Implementation of the business logic for APIs"),(0,o.mdx)("li",{parentName:"ul"},"Admin UI"),(0,o.mdx)("li",{parentName:"ul"},"Frontend UI")),(0,o.mdx)("p",null,"The Admin and frontend UIs can be separated, because it's possible to have two different technology stacks. The Admin UI uses UI components, while the frontend UI can use the ",(0,o.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/commerce/pwa-studio/"},"PWA")," studio stack, consisting of technology such as webpack, React, Redux, and GraphQL."),(0,o.mdx)("p",null,"Now, instead of creating one module that covers a specialized business domain, we create up to four modules, each one responsible for a dedicated layer of the system to provide high granularity for customizations. For example, in the standard application architecture, the ",(0,o.mdx)("inlineCode",{parentName:"p"},"InventorySales")," module would have contained all the APIs, business logic, and UI definitions. Now, these responsibilities are defined in the ",(0,o.mdx)("inlineCode",{parentName:"p"},"InventorySales"),",  ",(0,o.mdx)("inlineCode",{parentName:"p"},"InventorySalesApi"),", ",(0,o.mdx)("inlineCode",{parentName:"p"},"InventorySalesAdminUI"),", and ",(0,o.mdx)("inlineCode",{parentName:"p"},"InventorySalesFrontendUI")," modules."),(0,o.mdx)("p",null,"This approach implies additional code limitations in the modules:"),(0,o.mdx)("ul",null,(0,o.mdx)("li",{parentName:"ul"},"All modules should depend on the API module. Implementations can be swapped in ",(0,o.mdx)("inlineCode",{parentName:"li"},"di.xml")," files."),(0,o.mdx)("li",{parentName:"ul"},"API modules should contain web API tests. These tests cover API endpoints agnostically to the implementation details. Example: ",(0,o.mdx)("inlineCode",{parentName:"li"},"InventoryApi\\Tests\\Api\\*")),(0,o.mdx)("li",{parentName:"ul"},"Only UI modules should contain MFTF tests, because these tests cover the interaction between the user and the UI. Example: ",(0,o.mdx)("inlineCode",{parentName:"li"},"InventoryCatalogAdminUi\\Test\\Mftf\\*"),".")),(0,o.mdx)("h2",{id:"module-dependencies"},"Module dependencies"),(0,o.mdx)("p",null,'The list of Inventory Management dependencies varies, depending on whether the merchant has installed a headless version of the application. These merchants have integrated the application with external Enterprise Resource Planning (ERP) software, and they often consider the ERP software to be the "source of truth" for processes like order processing and inventory tracking. The ERP provides its own UI for managing information and processes. Attempting to use the application UI to manage the same things would be excessive and would lead to sophisticated bi-directional synchronization of all changed data.'),(0,o.mdx)("h3",{id:"dependencies-in-a-standard-installation"},"Dependencies in a standard installation"),(0,o.mdx)("p",null,"For non-headless installations, Inventory Management has dependencies on the following modules:"),(0,o.mdx)("ul",null,(0,o.mdx)("li",{parentName:"ul"},"Backend"),(0,o.mdx)("li",{parentName:"ul"},"BundleProduct"),(0,o.mdx)("li",{parentName:"ul"},"Catalog"),(0,o.mdx)("li",{parentName:"ul"},"CatalogInventory (legacy)"),(0,o.mdx)("li",{parentName:"ul"},"ConfigurableProduct"),(0,o.mdx)("li",{parentName:"ul"},"Directory"),(0,o.mdx)("li",{parentName:"ul"},"EAV"),(0,o.mdx)("li",{parentName:"ul"},"GroupedProduct"),(0,o.mdx)("li",{parentName:"ul"},"ImportExport"),(0,o.mdx)("li",{parentName:"ul"},"Reports"),(0,o.mdx)("li",{parentName:"ul"},"Sales"),(0,o.mdx)("li",{parentName:"ul"},"Shipping"),(0,o.mdx)("li",{parentName:"ul"},"Store"),(0,o.mdx)("li",{parentName:"ul"},"UI")),(0,o.mdx)("h3",{id:"dependencies-in-a-headless-installation"},"Dependencies in a headless installation"),(0,o.mdx)("p",null,"In headless installations, Inventory Management is dependent on the following modules:"),(0,o.mdx)("ul",null,(0,o.mdx)("li",{parentName:"ul"},"BundleProduct"),(0,o.mdx)("li",{parentName:"ul"},"Catalog"),(0,o.mdx)("li",{parentName:"ul"},"CatalogInventory (legacy)"),(0,o.mdx)("li",{parentName:"ul"},"ConfigurableProduct"),(0,o.mdx)("li",{parentName:"ul"},"EAV"),(0,o.mdx)("li",{parentName:"ul"},"GroupedProduct"),(0,o.mdx)("li",{parentName:"ul"},"ImportExport"),(0,o.mdx)("li",{parentName:"ul"},"Sales"),(0,o.mdx)("li",{parentName:"ul"},"Store")))}p.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-architecture-modules-inventory-management-md-54ac177f75ed99ac7851.js.map