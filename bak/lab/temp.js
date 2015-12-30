
            function doCommand(page, props, context, next) {
                // 做一个自定义的一次性赋值函数

                // 需要一个对象节点来挂载函数
                var objectNode = {
                    onceFn: function () {
                        // 业务逻辑
                        businessFn ();

                        // 执行完之后直接用函数覆盖
                        // 第二次进来时上面的不执行，直接进入下面的覆写函数中
                        objectNode.onceFn = function () {
                            next();
                        }
                    }
                };

                objectNode.onceFn();

                function businessFn () {
                    var parentNodeId = page.getValue('requestParentNodeIdParam');
                    if (parentNodeId !== undefined || parentNodeId !== '') {
                        var tempParamAry = parentNodeId.split('-');
                        nodeType = tempParamAry[0];
                        if (nodeType === 'DIME') {
                            dacDimeId = tempParamAry[1];
                            debugger;
                            page.setValue('addNodeDimeId', dacDimeId);
                            next();
                        }
                        else if (nodeType === 'NODE') {
                            dimeNodeId = tempParamAry[1];
                            iPage.ajax('queryDacDimeNodeById.do', {
                                dacDimeNodeId: dimeNodeId
                            }, function (data) {
                                var result = JSON.parse(data);
                                debugger;
                                page.setValue('addNodeDimeId', result.data.dacDimeId);
                                page.setValue('dimension-parentdim', dimeNodeId);
                                next();
                            }, function (msg) {
                                iPage.error(msg);
                            }); // ajax end
                        }
                    }
                    else {
                        // last nest
                        next();
                    }
                }
            }
