"use strict";(self.webpackChunkcommerce_php=self.webpackChunkcommerce_php||[]).push([[2578],{4628:function(e,o,n){n.r(o),n.d(o,{_frontmatter:function(){return u},default:function(){return f}});var i,t=n(87462),a=n(63366),l=(n(15007),n(64983)),d=n(91515),r=n(37259),m=["components"],u={},p=(i="InlineAlert",function(e){return console.warn("Component "+i+" was not imported, exported, or provided by MDXProvider as global scope"),(0,l.mdx)("div",e)}),s={_frontmatter:u},c=d.Z;function f(e){var o=e.components,n=(0,a.Z)(e,m);return(0,l.mdx)(c,(0,t.Z)({},s,n,{components:o,mdxType:"MDXLayout"}),(0,l.mdx)("h1",{id:"required-configuration-files"},"Required configuration files"),(0,l.mdx)("p",null,"Each ",(0,l.mdx)("a",{parentName:"p",href:"https://glossary.magento.com/module"},"module")," has its own set of configuration files, gathered into the module's ",(0,l.mdx)("inlineCode",{parentName:"p"},"etc")," directory."),(0,l.mdx)(p,{variant:"info",slots:"text",mdxType:"InlineAlert"}),(0,l.mdx)("p",null,"Unlike Magento 1, there is no monolithic configuration file in Adobe Commerce and Magento Open Source."),(0,l.mdx)("h2",{id:"root-directory-location"},"Root directory location"),(0,l.mdx)(r.default,{mdxType:"Docs"}),(0,l.mdx)("h2",{id:"location-of-configuration-files"},"Location of configuration files"),(0,l.mdx)("p",null,"Adobe Commerce and Magento Open Source look for configuration information for each module in that module's ",(0,l.mdx)("inlineCode",{parentName:"p"},"etc")," directory. Depending on the needs of your module, you might have the following configuration files at the top level of your module's ",(0,l.mdx)("inlineCode",{parentName:"p"},"etc")," directory:"),(0,l.mdx)("ul",null,(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},"acl.xml")),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},"config.xml")),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},"di.xml")),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},"module.xml")),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},"webapi.xml"))),(0,l.mdx)(p,{variant:"info",slots:"text",mdxType:"InlineAlert"}),(0,l.mdx)("p",null,"Additions you make to those configuration files are applied ",(0,l.mdx)("em",{parentName:"p"},"globally")," to your module."),(0,l.mdx)("p",null,"In addition to those files, a module also has nested configuration directories in the ",(0,l.mdx)("inlineCode",{parentName:"p"},"etc")," directory for any required administration html, frontend, API REST, or API SOAP specific configuration. Additions you make to files in these directories override the settings in the global configuration files for the respective functionality only. That is, if you add a ",(0,l.mdx)("inlineCode",{parentName:"p"},"config.xml")," file to ",(0,l.mdx)("inlineCode",{parentName:"p"},"etc/frontend"),", the settings you make in that file overrides the settings in ",(0,l.mdx)("inlineCode",{parentName:"p"},"etc/config.xml")," for ",(0,l.mdx)("a",{parentName:"p",href:"https://glossary.magento.com/storefront"},"storefront")," functionality ",(0,l.mdx)("em",{parentName:"p"},"only"),"."),(0,l.mdx)("ul",null,(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},"<your module root dir>/etc/adminhtml/")),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},"<your module root dir>/etc/frontend/")),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},"<your module root dir>/etc/webapi_rest/")),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},"<your module root dir>/etc/webapi_soap/"))),(0,l.mdx)("h3",{id:"global-vs-local"},"Global vs local"),(0,l.mdx)("ul",null,(0,l.mdx)("li",{parentName:"ul"},"Configuration files that are in the top level of that module's ",(0,l.mdx)("inlineCode",{parentName:"li"},"etc")," directory are global to that component."),(0,l.mdx)("li",{parentName:"ul"},"Configuration files placed in subdirectories (",(0,l.mdx)("inlineCode",{parentName:"li"},"adminhtml"),", ",(0,l.mdx)("inlineCode",{parentName:"li"},"frontend"),", ",(0,l.mdx)("inlineCode",{parentName:"li"},"webapi_rest"),", ",(0,l.mdx)("inlineCode",{parentName:"li"},"webapi_soap"),") apply only to those respective functional areas.")),(0,l.mdx)("h3",{id:"requirements"},"Requirements"),(0,l.mdx)("p",null,"The exact set of configuration files required for your module depends on what your new module does. The required configuration files depend on how you plan to use the module: will the module be manifested on the storefront UI, or in the ",(0,l.mdx)("a",{parentName:"p",href:"https://glossary.magento.com/magento-admin"},"Admin")," panel, or as a ",(0,l.mdx)("a",{parentName:"p",href:"https://glossary.magento.com/backend"},"backend")," ",(0,l.mdx)("a",{parentName:"p",href:"https://glossary.magento.com/extension"},"extension")," that makes a service call? Or all of the above. For example, if your module performs a function in the Admin, you should add any necessary configuration files for those functions to ",(0,l.mdx)("inlineCode",{parentName:"p"},"etc/adminhtml/"),", like:"),(0,l.mdx)("ul",null,(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},"<your module root dir>/etc/adminhtml/di.xml")),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},"<your module root dir>/etc/adminhtml/routes.xml"))),(0,l.mdx)("p",null,"Similarly, if your module changes the UI, you should add the needed configuration files to ",(0,l.mdx)("inlineCode",{parentName:"p"},"~/etc/frontend/"),". For example:"),(0,l.mdx)("ul",null,(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},"<your module root dir>/etc/frontend/di.xml")),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},"<your module root dir>/etc/frontend/page_types.xml"))),(0,l.mdx)("p",null,"If the module is a service that may call an API, or does some other work that is not manifested in the UI you should add any needed configuration files in the REST and/or SOAP webapi configuration directories, like this:"),(0,l.mdx)("ul",null,(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},"<your module root dir>/etc/webapi_rest/di.xml")),(0,l.mdx)("li",{parentName:"ul"},(0,l.mdx)("inlineCode",{parentName:"li"},"<your module root dir>/etc/webapi_soap/di.xml"))),(0,l.mdx)("p",null,"Keep in mind that you might be able to handle your module's configuration solely with configuration files at the top level of your module's ",(0,l.mdx)("inlineCode",{parentName:"p"},"etc")," directory, but the nested directory is a useful way to keep the configuration neatly compartmentalized."))}f.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-development-build-required-configuration-files-md-b46af6e18cb1195940d8.js.map