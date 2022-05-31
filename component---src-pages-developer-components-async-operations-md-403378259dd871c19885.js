"use strict";(self.webpackChunkcommerce_php=self.webpackChunkcommerce_php||[]).push([[9378],{53052:function(e,n,t){t.r(n),t.d(n,{_frontmatter:function(){return l},default:function(){return c}});var r=t(87462),i=t(63366),a=(t(15007),t(64983)),o=t(91515),s=["components"],l={},d={_frontmatter:l},u=o.Z;function c(e){var n=e.components,t=(0,i.Z)(e,s);return(0,a.mdx)(u,(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,a.mdx)("h1",{id:"asynchronous-and-deferred-operations"},"Asynchronous and deferred operations"),(0,a.mdx)("p",null,"Asynchronous operations are not native to PHP but it is still possible to execute heavy\noperations simultaneously, or delay them until they absolutely have to be finished."),(0,a.mdx)("p",null,"To make writing asynchronous code easier, Adobe Commerce and Magento Open Source provide the ",(0,a.mdx)("inlineCode",{parentName:"p"},"DeferredInterface")," to use with asynchronous operations.\nThis allows client code to work with asynchronous operations just as it would with standard operations."),(0,a.mdx)("h2",{id:"deferredinterface"},"DeferredInterface"),(0,a.mdx)("p",null,(0,a.mdx)("inlineCode",{parentName:"p"},"Magento\\Framework\\Async\\DeferredInterface")," is quite simple:"),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-php"},"interface DeferredInterface\n{\n    /**\n     * @return mixed Value.\n     * @throws \\Throwable\n     */\n    public function get();\n\n    public function isDone(): bool;\n}\n")),(0,a.mdx)("p",null,"When the client code needs the result, the ",(0,a.mdx)("inlineCode",{parentName:"p"},"get()")," method will be called to retrieve the result.\n",(0,a.mdx)("inlineCode",{parentName:"p"},"isDone()")," can be used to see whether the code has completed."),(0,a.mdx)("p",null,"There are 2 types of asynchronous operations where ",(0,a.mdx)("inlineCode",{parentName:"p"},"DeferredInterface")," can be used to describe the result:"),(0,a.mdx)("ul",null,(0,a.mdx)("li",{parentName:"ul"},"With asynchronous operations in progress, calling ",(0,a.mdx)("inlineCode",{parentName:"li"},"get()")," would wait for them to finish and return their result."),(0,a.mdx)("li",{parentName:"ul"},"With deferred operations, ",(0,a.mdx)("inlineCode",{parentName:"li"},"get()")," would actually start the operation, wait for it to finish, and then return the result.")),(0,a.mdx)("p",null,"Sometimes developers require more control over long asynchronous operations.\nThat is why there is an extended deferred variant - ",(0,a.mdx)("inlineCode",{parentName:"p"},"Magento\\Framework\\Async\\CancelableDeferredInterface"),":"),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-php"},"interface CancelableDeferredInterface extends DeferredInterface\n{\n    /**\n     * @param bool $force Cancel operation even if it's already started.\n     * @return void\n     * @throws CancelingDeferredException When failed to cancel.\n     */\n    public function cancel(bool $force = false): void;\n\n    /**\n     * @return bool\n     */\n    public function isCancelled(): bool;\n}\n")),(0,a.mdx)("p",null,"This interface is for operations that may take too long and can be canceled."),(0,a.mdx)("h3",{id:"client-code"},"Client code"),(0,a.mdx)("p",null,"Assuming that ",(0,a.mdx)("inlineCode",{parentName:"p"},"serviceA"),", ",(0,a.mdx)("inlineCode",{parentName:"p"},"serviceB")," and ",(0,a.mdx)("inlineCode",{parentName:"p"},"serviceC")," all execute asynchronous operations, such as HTTP requests, the client code would look like:"),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-php"},"public function aMethod() {\n    //Started executing 1st operation\n    $operationA = $serviceA->executeOp();\n\n    //Executing 2nd operations at the same time\n    $operationB = $serviceB->executeOp2();\n\n    //We need to wait for 1st operation to start operation #3\n    $serviceC->executeOp3($operationA->get());\n\n    //We don't have to wait for operation #2, let client code wait for it if it needs the result\n    //Operation number #3 is being executed simultaneously with operation #2\n    return $operationB;\n}\n")),(0,a.mdx)("p",null,"And not a callback in sight!"),(0,a.mdx)("p",null,"With the deferred client, the code can start multiple operations at the same time, wait for operations required to finish and pass the promise of a result to another method."),(0,a.mdx)("h2",{id:"proxydeferredfactory"},"ProxyDeferredFactory"),(0,a.mdx)("p",null,"When writing a module or an extension, you may not want to burden other developers with having to know that your method is performing an asynchronous operation.\nThere is a way to hide it: employ the autogenerated factory ",(0,a.mdx)("inlineCode",{parentName:"p"},"YourClassName\\ProxyDeferredFactory"),". With its help, you can return values that seem like regular objects\nbut are in fact deferred results."),(0,a.mdx)("p",null,"For example:"),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-php"},"public function __construct(CallResult\\ProxyDeferredFactory $callResultFactory)\n{\n    $this->proxyDeferredFactory = $callResultFactory;\n}\n\n....\n\npublic function doARemoteCall(string $uniqueValue): CallResult\n{\n    //Async HTTP request, get() will return a CallResult instance.\n    //Call is in progress.\n    $deferredResult = $this->client->call($uniqueValue);\n\n    //Returns CallResult instance that will call $deferredResult->get() when any of the object's methods is used.\n    return $this->proxyDeferredFactory->create(['deferred' => $deferredResult]);\n}\n\npublic function doCallsAndProcess(): Result\n{\n    //Both calls running simultaneously\n    $call1 = $this->doARemoteCall('call1');\n    $call2 = $this->doARemoteCall('call2');\n\n    //Only when CallResult::getStuff() is called the $deferredResult->get() is called.\n    return new Result([\n        'call1' => $call1->getStuff(),\n        'call2' => $call2->getStuff()\n    ]);\n}\n")),(0,a.mdx)("h2",{id:"using-deferredinterface-for-background-operations"},"Using DeferredInterface for background operations"),(0,a.mdx)("p",null,"As mentioned above, the first type of asynchronous operations are operations executing in a background.\n",(0,a.mdx)("inlineCode",{parentName:"p"},"DeferredInterface")," can be used to give client code a promise of a not-yet-received result and wait for it by calling the ",(0,a.mdx)("inlineCode",{parentName:"p"},"get()")," method."),(0,a.mdx)("p",null,"Take a look at an example: creating shipments for multiple products:"),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-php"},"class DeferredShipment implements DeferredInterface\n{\n    private $request;\n\n    private $done = false;\n\n    private $trackingNumber;\n\n    public function __construct(AsyncRequest $request)\n    {\n        $this->request = $request;\n    }\n\n    public function isDone() : bool\n    {\n        return $this->done;\n    }\n\n    public function get()\n    {\n        if (!$this->trackingNumber) {\n            $this->request->wait();\n            $this->trackingNumber = json_decode($this->request->getBody(), true)['tracking'];\n\n            $this->done = true;\n        }\n\n        return $this->trackingNumber;\n    }\n}\n\nclass Shipping\n{\n    ....\n\n    public function ship(array $products): array\n    {\n        $shipments = [];\n        //Shipping simultaneously\n        foreach ($products as $product) {\n            $shipments[] = new DeferredShipment(\n                $this->client->sendAsync(['id' => $product->getId()])\n            );\n        }\n\n        return $shipments;\n    }\n}\n\nclass ShipController\n{\n    ....\n\n    public function execute(Request $request): Response\n    {\n        $shipments = $this->shipping->ship($this->products->find($request->getParam('ids')));\n        $trackingsNumbers = [];\n        foreach ($shipments as $shipment) {\n            $trackingsNumbers[] = $shipment->get();\n        }\n\n        return new Response(['trackings' => $trackingNumbers]);\n    }\n}\n")),(0,a.mdx)("p",null,"Here, multiple shipment requests are being sent at the same time with their results gathered later.\nIf you do not want to write your own ",(0,a.mdx)("inlineCode",{parentName:"p"},"DeferredInterface")," implementation, you can use ",(0,a.mdx)("inlineCode",{parentName:"p"},"CallbackDeferred")," to provide callbacks that will be used when ",(0,a.mdx)("inlineCode",{parentName:"p"},"get()")," is called."),(0,a.mdx)("h2",{id:"using-deferredinterface-for-deferred-operations"},"Using DeferredInterface for deferred operations"),(0,a.mdx)("p",null,"The second type of asynchronous operations are operations that are being postponed and executed only when a result is absolutely needed."),(0,a.mdx)("p",null,"An example:"),(0,a.mdx)("p",null,"Assume you are creating a repository for an entity and you have a method that returns a singular entity by ID.\nYou want to make a performance optimization for cases when multiple entities are requested during the same request-response process, so you would not load them separately."),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-php"},"class EntityRepository\n{\n    private $requestedEntityIds = [];\n\n    private $identityMap = [];\n\n    ...\n\n    /**\n     * @return Entity[]\n     */\n    public function findMultiple(array $ids): array\n    {\n        .....\n\n        //Adding found entities to the identity map be able to find them by ID.\n        foreach ($found as $entity) {\n            $this->identityMap[$entity->getId()] = $entity;\n        }\n\n        ....\n    }\n\n    public function find(string $id): Entity\n    {\n        //Adding this ID to the list of previously requested IDs.\n        $this->requestedEntityIds[] = $id;\n\n        //Returning deferred that will find all requested entities\n        //and return the one with $id\n        return $this->proxyDeferredFactory->createFor(\n            Entity::class,\n            new CallbackDeferred(\n                function () use ($id) {\n                    if (empty($this->identityMap[$id])) {\n                        $this->findMultiple($this->requestedEntityIds);\n                        $this->requestedEntityIds = [];\n                    }\n\n                    return $this->identityMap[$id];\n                }\n            )\n        );\n    }\n\n    ....\n}\n\nclass EntitiesController\n{\n    ....\n\n    public function execute(): Response\n    {\n        //No actual DB query issued\n        $criteria1Id = $this->entityService->getEntityIdWithCriteria1();\n        $criteria2Id = $this->entityService->getEntityIdWithCriteria2();\n        $criteria1Entity = $this->entityRepo->find($criteria1Id);\n        $criteria2Entity = $this->entityRepo->find($criteria2Id);\n\n        //Querying the DB for both entities only when getStringValue() is called the 1st time.\n        return new Response(\n            [\n                'criteria1' => $criteria1Entity->getStringValue(),\n                'criteria2' => $criteria2Entity->getStringValue()\n            ]\n        );\n    }\n}\n")),(0,a.mdx)("h2",{id:"examples"},"Examples"),(0,a.mdx)("p",null,"See our asynchronous HTTP client ",(0,a.mdx)("inlineCode",{parentName:"p"},"Magento\\Framework\\HTTP\\AsyncClientInterface")," and ",(0,a.mdx)("inlineCode",{parentName:"p"},"Magento\\Shipping\\Model\\Shipping")," with various ",(0,a.mdx)("inlineCode",{parentName:"p"},"Magento\\Shipping\\Model\\Carrier\\AbstractCarrierOnline")," implementations to see how ",(0,a.mdx)("inlineCode",{parentName:"p"},"DeferredInterface")," can be used to work with asynchronous code."))}c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-developer-components-async-operations-md-403378259dd871c19885.js.map