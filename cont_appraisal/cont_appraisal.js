'use strict';
var meta4 = meta4 || {};

meta4.cont_appraisal = meta4.cont_appraisal || {};

meta4.cont_appraisal.cont_appraisal_ess= ( function() {
		
		var t3PLCO_CP_MT_HR_ROLE = null;
		var PLCO_CP_MT_HR_ROLE = 'PLCO_CP_MT_HR_ROLE';
		var nodePLCO_CP_MT_HR_ROLE = null;
		var nodePLCO_CP_HR_ACTIVITIES = null;
		var nodePLCO_CP_HR_ACTIVITY_FEEDBACK = null;
		var _t3PLCO_CP_MT_KNOW_MAP = null;
		var _t3PLCO_CP_MT_OBJ_CUAN = null;
		var _t3PLCO_CP_MT_OBJ_CUALI = null;
		
		var numMaxFeedback = 3;
		var empType= null;
		var hasCriteria= null;
		var hasCriEk= null;
		var hasCriObjCuan= null;
		var hasCriObjCual= null;

		var tabToshow = 'tab_by_date';
		 
		function NoActivity(){
			var divHelpPanel = new Element('div', {'class' : 'm4-flex columns center vCenter m4-mainHelp'});
			var arrow = new Element('img', {'src' : meta4.widget.icons.arrow_bg,'class' : 'm4-rotate'});
			var pHelp1 = new Element('h3', {'text' : meta4.widget.translate.getTranslate('_NoActivity')});
			var  pHelp12= new Element('h3', {'text' : meta4.widget.translate.getTranslate('_NoActivity_other')});
			var pHelp2 = new Element('p', {'class' : 'm4-xsMarginTop','text' : meta4.widget.translate.getTranslate('_NoActivityAdd')});
			if (empType==="0"){
				if (meta4.data.utils.getValue(nodePLCO_CP_MT_HR_ROLE, 'SCO_ID_HR')=== meta4.data.utils.getValue(nodePLCO_CP_MT_HR_ROLE, 'PRP_PERSON_CONNECTED')){
				var pHelp1 = new Element('h3', {'text' : meta4.widget.translate.getTranslate('_NoActivity')});
				divHelpPanel.adopt(arrow, pHelp1, pHelp2);
			} else {
				divHelpPanel.adopt(arrow, pHelp12, pHelp2);	
			} 
			} else {
				divHelpPanel.adopt(pHelp12);
			} 
			return(divHelpPanel);
		}

		function getValidationsForm() {
			var validations = [];
	
			var validateNameActivity = function(value) {	
				if ((value !== '' )  ){
					return true; 
				} else {
					return false;
				} 
			};
		
			var objValidationDeadline = ['validateNameActivity', 'PLCO_NM_ACTIVITY', validateNameActivity, ' '];
			validations.push(objValidationDeadline);
	
			return validations;
		}

		function editActivity(pos) {
			nodePLCO_CP_HR_ACTIVITIES.moveTo(pos);

			function closeForm(request) {
				var retValue = parseInt(request.getResult());
				if (retValue !== -1) {
					form.destroyPopUp();	
					document.removeEvent("onCloseHandler", onCloseHandler);
				} 
			}
			var onCloseHandler = function(e) {
				var request = new meta4.M4Request(t3PLCO_CP_MT_HR_ROLE, 'PLCO_CP_HR_ACTIVITIES', 'UNDO_REGISTER', null);
				meta4.data.execute(request,closeForm);	
			};
			document.addEvent("onCloseHandler", onCloseHandler);
			 
			var validationsForm = getValidationsForm();

			var valuesItems = meta4.data.utils.getValues(nodePLCO_CP_HR_ACTIVITIES, ['SCO_NM_EXTD_KN', 'SCO_NM_OBJECTIVE_C','SCO_NM_OBJECTIVE_CL'], null);
			var nameKn = valuesItems[0];
			var nameObjCuanti = valuesItems[1];		
			var nameObjCuanli = valuesItems[2];		

			if (hasCriEk==="1"){ 
				if (nameKn.length > 0) {
					var nodeKnow = _t3PLCO_CP_MT_KNOW_MAP.getNode('PLCO_CP_MT_KNOW_MAP');
					meta4.data.utils.setValue(nodeKnow, 'PRP_EDIT',1);
				}
			}

			if (hasCriObjCuan==="1"){ 
				if (nameObjCuanti.length > 0) {
					var nodeKnow = _t3PLCO_CP_MT_OBJ_CUAN.getNode('PLCO_CP_MT_OBJ_CUAN');
					meta4.data.utils.setValue(nodeKnow, 'PRP_EDIT',1);
				}				
			}

			if (hasCriObjCual==="1"){ 
				if (nameObjCuanli.length > 0) {
					var nodeKnow = _t3PLCO_CP_MT_OBJ_CUALI.getNode('PLCO_CP_MT_OBJ_CUALI');
					meta4.data.utils.setValue(nodeKnow, 'PRP_EDIT',1);
				}				
			}

			var optionsForm = {
				allowCheckForm: true,
				makePopUp : true,
				title : meta4.widget.translate.getTranslate('_activity_edit'),
				addRegister : false,
				makePopUpCloseEvent : 'onCloseHandler',
				validations: validationsForm,
				itemTypes : {
					'PLCO_NM_ACTIVITY' : {
						'nodeName' : meta4.widget.TypeElement.input,
						isPk: true
					},
					'SCO_ID_CP_PRIORITY' : {
						'nodeName': meta4.widget.TypeElement.m4Select,
						'idNodeAux': 'PLCO_CP_PRIORITY',
						'idItemNameAux': 'SCO_NM_CP_PRIORITY',
						'idItemValueAux': 'SCO_ID_CP_PRIORITY',
						'nullValue' : false,
						showDefaultValueWhenTitle : true,
					},
					'SCO_NM_EXTD_KN' : {
						'nodeName' : meta4.widget.TypeElement.m4ListJS,
						'meta4Object' : _t3PLCO_CP_MT_KNOW_MAP,						
						'nodeQBFId' : 'PLCO_CP_QBF_KNOW_MAP',
						'itemsSearch' : 'SCO_NM_EXTD_KN', 
						'nodeTRId' : 'PLCO_CP_MT_KNOW_MAP',
						'itemResult' : 'SCO_NM_EXTD_KN', 
						'showRecents' : false ,			
						'checkInitialValue' : true, 
						'alternativeResult' : [{
							itemQBF : 'SCO_ID_EXTD_KN', 
							item : 'SCO_ID_EXTD_KN'
						}],

						'onValidValue' : function(obj)  {
							if (hasCriObjCuan==="1"){
								if (obj.value.length > 0) {
								
									form._elementsForm["SCO_NM_OBJECTIVE_C"].m4Disabled();
								}else{
									form._elementsForm["SCO_NM_OBJECTIVE_C"].m4Enabled();
								}
								}
							if (hasCriObjCual==="1"){
								if (obj.value.length > 0) {
								
									form._elementsForm["SCO_NM_OBJECTIVE_CL"].m4Disabled();
								}else{
									form._elementsForm["SCO_NM_OBJECTIVE_CL"].m4Enabled();
								}
								}
						},
 
					},
					'SCO_NM_OBJECTIVE_C' : {
						'nodeName' : meta4.widget.TypeElement.m4ListJS,
						'meta4Object' : _t3PLCO_CP_MT_OBJ_CUAN,
						'showRecents' : false ,						
						'nodeQBFId' : 'PLCO_CP_QBF_OBJ_CUAN',
						'itemsSearch' : 'SCO_NM_OBJECTIVE', 
						'nodeTRId' : 'PLCO_CP_MT_OBJ_CUAN',
						'itemResult' : 'SCO_NM_OBJECTIVE',							
						'checkInitialValue' : true, 						
						'alternativeResult' : [{
							itemQBF : 'SCO_ID_OBJECTIVE', 
							item : 'SCO_ID_OBJ_CUANTI'
						}],					
						'onValidValue' : function(obj)  {
							if (hasCriEk==="1"){
							if (obj.value.length > 0) {
							
								form._elementsForm["SCO_NM_EXTD_KN"].m4Disabled();
							}else{
								form._elementsForm["SCO_NM_EXTD_KN"].m4Enabled();
							}
							}
							if (hasCriObjCual==="1"){
								if (obj.value.length > 0) {
								
									form._elementsForm["SCO_NM_OBJECTIVE_CL"].m4Disabled();
								}else{
									form._elementsForm["SCO_NM_OBJECTIVE_CL"].m4Enabled();
								}
								}
						}
					},
					'SCO_NM_OBJECTIVE_CL' : {
						'nodeName' : meta4.widget.TypeElement.m4ListJS,
						'meta4Object' : _t3PLCO_CP_MT_OBJ_CUALI,						
						'showRecents' : false ,
						'checkInitialValue' : true, 
						'nodeQBFId' : 'PLCO_CP_QBF_OBJ_CUALI',
						'itemsSearch' : 'SCO_NM_OBJECTIVE', 
						'nodeTRId' : 'PLCO_CP_MT_OBJ_CUALI',
						'itemResult' : 'SCO_NM_OBJECTIVE', 																	
						'alternativeResult' : [{
							itemQBF : 'SCO_ID_OBJECTIVE', 
							item : 'SCO_ID_OBJ_CUALI'
						}],					
						'onValidValue' : function(obj)  {
							if (hasCriEk==="1"){
							if (obj.value.length > 0) {
							
								form._elementsForm["SCO_NM_EXTD_KN"].m4Disabled();
							}else{
								form._elementsForm["SCO_NM_EXTD_KN"].m4Enabled();
							}
							}
							if (hasCriObjCuan==="1"){
								if (obj.value.length > 0) {
								
									form._elementsForm["SCO_NM_OBJECTIVE_C"].m4Disabled();
								}else{
									form._elementsForm["SCO_NM_OBJECTIVE_C"].m4Enabled();
								}
								}
						}
					},					
					'SCO_ID_CP_STATUS' : {
						'nodeName': meta4.widget.TypeElement.m4Select,
						'idNodeAux': 'PLCO_CP_STATUS',
						'idItemNameAux': 'SCO_NM_CP_STATUS',
						'idItemValueAux': 'SCO_ID_CP_STATUS',
						'nullValue' : false,
						showDefaultValueWhenTitle : true,
					},							
				}
			};		
		
		
			if (hasCriEk==="0"){
				delete optionsForm.itemTypes["SCO_NM_EXTD_KN"];
			}
			if (hasCriObjCuan==="0"){
				delete optionsForm.itemTypes["SCO_NM_OBJECTIVE_C"];
			}
			if (hasCriObjCual==="0"){
				delete optionsForm.itemTypes["SCO_NM_OBJECTIVE_CL"];
			}

			// Pintamos el formulario:
			var form = new meta4.widget.Form(t3PLCO_CP_MT_HR_ROLE, 'PLCO_CP_HR_ACTIVITIES', optionsForm);	

			// si el estado es 01 deshabilitamos para que no cambien el estado
			if ( meta4.data.utils.getValue(nodePLCO_CP_HR_ACTIVITIES, 'SCO_ID_CP_STATUS') === '01'){
				form.disableElement('SCO_ID_CP_STATUS');
			}

			// Boton Grabar
			var optionsSaveNewButton = {
                'id': 'btnCancelPaintForm',
                'class': 'm4-minMarginRight',
				'typeButton' : 'primary',
				'm4autoTooltip' : false,
				'events' : {
					'click' : function(){
						function showMessage(request){
							var retValue = parseInt(request.getResult());
							if (retValue !== -1) {
								meta4.data.showPopUpWrapData(meta4.widget.translate.getTranslate('_saveOk')); 
								form.destroyPopUp();
								// Repintamos
								var containerData = $('containerTables');								
								realoadDataEmployee(containerData);
							}
						}
						var request = new meta4.M4Request(t3PLCO_CP_MT_HR_ROLE, 'PLCO_CP_HR_ACTIVITIES', 'PLCO_EDIT', null);
						meta4.data.execute(request, showMessage);
					}
				}
			};
			var saveNewButton = new meta4.widget.Button(meta4.widget.translate.getTranslate('_saveEditActivity'),'',optionsSaveNewButton);
			form.addButtons([saveNewButton]);
			
			form.addEvent('hasFormErrors', function (hasFormErrors) {
				if (hasFormErrors) {
					saveNewButton.m4Disabled();
				} else {
					saveNewButton.m4Enabled();
				}
			});				
			
			// Boton Cancelar
			var optionsCancelButton = {
				'id': 'btnCancelPaintForm',
				'typeButton' : 'secondary',
				'm4autoTooltip' : false,
				'events' : {
				'click' : function(){
					onCloseHandler();
					}
				}
			};
			var cancelButton = new meta4.widget.Button(meta4.widget.translate.getTranslate('_close'),'',optionsCancelButton);
			form.addButtons([cancelButton]);			
		}


		function askFeedback(pos){
			nodePLCO_CP_HR_ACTIVITIES.moveTo(pos);
			var onCloseHandlerAsk = function(e) {
				formAsk.destroyPopUp();	
				document.removeEvent("onCloseHandlerAsk", onCloseHandlerAsk);
			};
			document.addEvent("onCloseHandlerAsk", onCloseHandlerAsk);

			var optionsFormAsk = {
				allowCheckForm: true,
				makePopUp : true,
				title : meta4.widget.translate.getTranslate('_btnAskFeedback'), 
				addRegister : false,
				makePopUpCloseEvent : 'onCloseHandlerAsk',
				itemTypes : {					 				
					'PRP_LIST_EMPLOYEES_NM_ASK' : {  
						nodeName : meta4.widget.TypeElement.m4ListJS,
						multiselect: true,
						hiddenShowAll: true,
						showRecents: false,
						meta4Object : 'PGCO_FL_TR_HR_PERIOD',
						nodeQBFId : 'PGCO_FL_QBF_TR_HR_PERIOD',
						nodeTRId : 'PLCO_TK_MT_HR_PERIOD',
						itemsSearch : 'SCO_GB_NAME',
						itemResult : 'SCO_GB_NAME',						
						alternativeResult : [{
							'itemQBF' : 'STD_ID_HR',
							'item' : 'PRP_LIST_EMPLOYEES_ASK'
						}],						
						onValidValue : function(obj) {
							(obj.value.length > 0) ? saveNewButtonAsk.m4Enabled() : saveNewButtonAsk.m4Disabled();
						},
						onInvalidValue : function(obj) {
							saveNewButtonAsk.m4Disabled();
						},
 
					}					
				}
			};		
	
			var formAsk = new meta4.widget.Form(t3PLCO_CP_MT_HR_ROLE, 'PLCO_CP_HR_ACTIVITIES', optionsFormAsk);	
					
			// Boton Grabar
			var optionsSaveAsk = {
                'id': 'btnAskPaintForm',
                'class': 'm4-minMarginRight',
				'typeButton' : 'primary',
				'm4autoTooltip' : false,
				'events' : {
					'click' : function(){						 
						function showMessageFinish(request){
							var retValue = parseInt(request.getResult());
							if (retValue !== -1) {
								meta4.data.showPopUpWrapData(meta4.widget.translate.getTranslate('_save_ask_ok'));  
								formAsk.destroyPopUp();

							}
						}
						var pos = nodePLCO_CP_HR_ACTIVITIES.getCurrent() ;
						var request = new meta4.M4Request(t3PLCO_CP_MT_HR_ROLE, 'PLCO_CP_HR_ACTIVITIES', 'PLCO_ASK_FEEDBACK', null);
						meta4.data.execute(request, showMessageFinish);						 
					}
				}
			};
			var saveNewButtonAsk = new meta4.widget.Button(meta4.widget.translate.getTranslate('_save_ask'),'',optionsSaveAsk);
			formAsk.addButtons([saveNewButtonAsk]);		

			saveNewButtonAsk.m4Disabled(); // para que al crearlo este el boton deshabilitado	
						
			// Boton Cancelar
			var optionsCancelButton = {
				'id': 'btnCancelPaintForm',
				'typeButton' : 'secondary',
				'm4autoTooltip' : false,
				'events' : {
				'click' : function(){
					onCloseHandlerAsk();
					}
				}
			};
			var cancelButton = new meta4.widget.Button(meta4.widget.translate.getTranslate('_close'),'',optionsCancelButton);
			formAsk.addButtons([cancelButton]);	
		}

		function deleteAction(pos){
			nodePLCO_CP_HR_ACTIVITIES.moveTo(pos);

			function showMessageDelete(request){
				var retValue = parseInt(request.getResult());
				if (retValue !== -1) {
					meta4.data.showPopUpWrapData(meta4.widget.translate.getTranslate('_saveOk')); 

					// Repintamos
					var containerData = $('containerTables');
					realoadDataEmployee(containerData); 
				}
			} 		

			function responseConfirm(bool) {
				if (bool) {
					var request = new meta4.M4Request(t3PLCO_CP_MT_HR_ROLE, 'PLCO_CP_HR_ACTIVITIES', 'PLCO_DELETE', null);
					meta4.data.execute(request, showMessageDelete);	
				}
			}				
			
			var msg = meta4.widget.translate.getTranslate('_ask_delete_action');
			meta4.widget.utils.m4Confirm(msg, responseConfirm.bind(this));
 
		}

		function cancelAction(pos){
			nodePLCO_CP_HR_ACTIVITIES.moveTo(pos);
			var onCloseHandlerCancel = function(e) {
				formCancel.destroyPopUp();	
				document.removeEvent("onCloseHandlerCancel", onCloseHandlerCancel);
			};
			document.addEvent("onCloseHandlerCancel", onCloseHandlerCancel);
			 

			var optionsFormCancel = {
				allowCheckForm: true,
				makePopUp : true,
				title : meta4.widget.translate.getTranslate('_btnCancel'),
				addRegister : false,
				makePopUpCloseEvent : 'onCloseHandlerCancel',
				itemTypes : {					 				
					'PLCO_COMMENT_CANCEL' : {
						nodeName : meta4.widget.TypeElement.comment, 
						showImage : false,                     
						classTdDiv: 'm4-input100', 
						placeHolder : meta4.widget.translate.getTranslate('_comment_tooltip')
					}					
				}
			};		
	
			var formCancel = new meta4.widget.Form(t3PLCO_CP_MT_HR_ROLE, 'PLCO_CP_HR_ACTIVITIES', optionsFormCancel);	
					
			// Boton Grabar
			var optionsSaveCancel = {
                'id': 'btnCancelPaintForm',
                'class': 'm4-minMarginRight',
				'typeButton' : 'primary',
				'm4autoTooltip' : false,
				'events' : {
					'click' : function(){						 
						function showMessageFinish(request){
							var retValue = parseInt(request.getResult());
							if (retValue !== -1) {
								meta4.data.showPopUpWrapData(meta4.widget.translate.getTranslate('_saveOk')); 
								formCancel.destroyPopUp();
 
								// Repintamos
								var containerData = $('containerTables');
								realoadDataEmployee(containerData); 
							}
						}
						var pos = nodePLCO_CP_HR_ACTIVITIES.getCurrent() ;
						var request = new meta4.M4Request(t3PLCO_CP_MT_HR_ROLE, 'PLCO_CP_HR_ACTIVITIES', 'PLCO_CANCEL', null);
						meta4.data.execute(request, showMessageFinish);						 
					}
				}
			};
			var saveNewButtonCancel = new meta4.widget.Button(meta4.widget.translate.getTranslate('_saveCancel'),'',optionsSaveCancel); 
			formCancel.addButtons([saveNewButtonCancel]);				
			
			// Boton Cancelar
			var optionsCancelButton = {
				'id': 'btnCancelPaintForm',
				'typeButton' : 'secondary',
				'm4autoTooltip' : false,
				'events' : {
				'click' : function(){
					onCloseHandlerCancel();
					}
				}
			};
			var cancelButton = new meta4.widget.Button(meta4.widget.translate.getTranslate('_close'),'',optionsCancelButton);
			formCancel.addButtons([cancelButton]);	
		}

		function finishAction(pos){
            if(!pos){
                return;
            }
			nodePLCO_CP_HR_ACTIVITIES.moveTo(pos);
			var onCloseHandlerFinish = function(e) {
				formFinish.destroyPopUp();	
				document.removeEvent("onCloseHandlerFinish", onCloseHandlerFinish);
			};
			document.addEvent("onCloseHandlerFinish", onCloseHandlerFinish);
			 

			var optionsFormFinish = {
				allowCheckForm: true,
				makePopUp : true,
				title : meta4.widget.translate.getTranslate('_btnComplete'),
				addRegister : false,
				makePopUpCloseEvent : 'onCloseHandlerFinish',
				itemTypes : {					 				
					'PLCO_COMMENT_FINISH' : {
						nodeName : meta4.widget.TypeElement.comment, 
						showImage : false,                     
						classTdDiv: 'm4-input100', 
						placeHolder : meta4.widget.translate.getTranslate('_comment_tooltip')
					}					
				}
			};		
	
			var formFinish = new meta4.widget.Form(t3PLCO_CP_MT_HR_ROLE, 'PLCO_CP_HR_ACTIVITIES', optionsFormFinish);	
					
			// Boton Grabar
			var optionsSaveNewButton = {
                'id': 'btnCancelPaintForm',
                'class': 'm4-minMarginRight',
				'typeButton' : 'primary',
				'm4autoTooltip' : false,
				'events' : {
					'click' : function(){						 
						function showMessageFinish(request){
							var retValue = parseInt(request.getResult());
							if (retValue !== -1) {
								meta4.data.showPopUpWrapData(meta4.widget.translate.getTranslate('_saveOk')); 
								formFinish.destroyPopUp();
								// ocultamos todos los botoenes:								 
								var idBtns =  'groupedActionsMain_'+ pos;
								var groupedActions = $(idBtns);
								if (groupedActions) { 
									groupedActions.addClass('hidden');
								}
								// Repintamos
								var containerData = $('containerTables');
								realoadDataEmployee(containerData); 
							}
						}
						var pos = nodePLCO_CP_HR_ACTIVITIES.getCurrent() ;
						var request = new meta4.M4Request(t3PLCO_CP_MT_HR_ROLE, 'PLCO_CP_HR_ACTIVITIES', 'PLCO_FINISH', null);
						meta4.data.execute(request, showMessageFinish);						 
					}
				}
			};
			var saveNewButtonFeedback = new meta4.widget.Button(meta4.widget.translate.getTranslate('_saveFinish'),'',optionsSaveNewButton);
			formFinish.addButtons([saveNewButtonFeedback]);				
			
			// Boton Cancelar
			var optionsCancelButton = {
				'id': 'btnCancelPaintForm',
				'typeButton' : 'secondary',
				'm4autoTooltip' : false,
				'events' : {
				'click' : function(){
					onCloseHandlerFinish();
					}
				}
			};
			var cancelButton = new meta4.widget.Button(meta4.widget.translate.getTranslate('_close'),'',optionsCancelButton);
			formFinish.addButtons([cancelButton]);					

		}

		function getValidationsFormNewFeedback() {
			var validations = []; 	 
			var validateOrderFeedback = function(value) {	
				var orderSelected = meta4.data.utils.getValue(nodePLCO_CP_HR_ACTIVITY_FEEDBACK, 'PLCO_ORDER');
				if (( (value !== '') && (orderSelected > 0) )  ){
					return true; 
				} else {
					return false;
				} 
			};		
			var objValidationOrderFeedback = ['validateOrderFeedback', 'PLCO_DESCRIPTION', validateOrderFeedback,meta4.widget.translate.getTranslate('_error_add_feedback')];
			validations.push(objValidationOrderFeedback);	 
			return validations;
		}

		function newFeedback(pos) {
			nodePLCO_CP_HR_ACTIVITIES.moveTo(pos);
			function closeFormNewFeedback(request) {
				var retValue = parseInt(request.getResult());
				if (retValue !== -1) {
					formNewFeedback.destroyPopUp();	
					document.removeEvent("onCloseHandlerNewFeedback", onCloseHandlerNewFeedback);
				} 
			}
			var onCloseHandlerNewFeedback = function(e) {
				var request = new meta4.M4Request(t3PLCO_CP_MT_HR_ROLE, 'PLCO_CP_HR_ACTIVITY_FEEDBACK', 'DESTROYREGISTER', null);
				meta4.data.execute(request,closeFormNewFeedback);	
			};
			document.addEvent("onCloseHandlerNewFeedback", onCloseHandlerNewFeedback);
			 
			var validationsFormNewFeedback = getValidationsFormNewFeedback();

			var optionsForm = {
				allowCheckForm: true,
				makePopUp : true,
				title : meta4.widget.translate.getTranslate('_btnFeedback'),
				addRegister : true,
				makePopUpCloseEvent : 'onCloseHandlerNewFeedback',
			//	classPopUp : 'm4-popUpSize50',
				focusInFirstElement: false,
				validations: validationsFormNewFeedback,
				itemTypes : {					 
					'PLCO_ORDER' : {
						nodeName : meta4.widget.TypeElement.rate,
						iconsToShow: 5,
						toolTip: meta4.data.utils.getValue(nodePLCO_CP_MT_HR_ROLE, 'PLCO_REVIEW_SCALE_DESCRIPTION'),
						labelText: ' '  
					},					
					'PLCO_DESCRIPTION' : {
						nodeName : meta4.widget.TypeElement.comment, 
						showImage : false,                     
						classTdDiv: 'm4-input100', 
						placeHolder : meta4.widget.translate.getTranslate('_comment_tooltip'),
						labelText: ' ' 
					},					 
					'PRP_LABEL_FEDEBACK' : {
						'nodeName' : meta4.widget.TypeElement.label,
						'labelText' : ' ',
						'text': meta4.widget.translate.getTranslate('_txt_add_feedback'), 
					} 					
				}
			};		
	
			var formNewFeedback = new meta4.widget.Form(t3PLCO_CP_MT_HR_ROLE, 'PLCO_CP_HR_ACTIVITY_FEEDBACK', optionsForm);	
					
			// Boton Grabar
			var optionsSaveNewButton = {
                'id': 'btnCancelPaintForm',
                'class': 'm4-minMarginRight',
				'typeButton' : 'primary',
				'm4autoTooltip' : false,
				'events' : {
					'click' : function(){						 
						function showMessage(request){
							var retValue = parseInt(request.getResult());
							if (retValue !== -1) {
								meta4.data.showPopUpWrapData(meta4.widget.translate.getTranslate('_saveOk')); 
								formNewFeedback.destroyPopUp();
								// ocultamos el boton añadir feedback:								 
								var idBtnAddFeedback =  'buttonFeedback_'+ pos;
								var btnAddfeedback = $(idBtnAddFeedback);
								if (btnAddfeedback) { 
									btnAddfeedback.addClass('hidden');
								}
								// Repintamos
								reloadDataFeedback(pos, false);
							}
						}
						var pos = nodePLCO_CP_HR_ACTIVITIES.getCurrent() ;
						var request = new meta4.M4Request(t3PLCO_CP_MT_HR_ROLE, 'PLCO_CP_HR_ACTIVITY_FEEDBACK', 'PLCO_ADD_FEEDBACK', null);
						meta4.data.execute(request, showMessage);						 
					}
				}
			};
			var saveNewButtonFeedback = new meta4.widget.Button(meta4.widget.translate.getTranslate('_saveAdd'),'',optionsSaveNewButton);
			formNewFeedback.addButtons([saveNewButtonFeedback]);
			
			formNewFeedback.addEvent('hasFormErrors', function (hasFormErrors) {
				if (hasFormErrors) {
					saveNewButtonFeedback.m4Disabled();
				} else {
					saveNewButtonFeedback.m4Enabled();
				}
			});
			formNewFeedback.hasFormErrors(true); // para que al crearlo este el boton deshabilitado					
			
			// Boton Cancelar
			var optionsCancelButton = {
				'id': 'btnCancelPaintForm',
				'typeButton' : 'secondary',
				'm4autoTooltip' : false,
				'events' : {
				'click' : function(){
					onCloseHandlerNewFeedback();
					}
				}
			};
			var cancelButton = new meta4.widget.Button(meta4.widget.translate.getTranslate('_close'),'',optionsCancelButton);
			formNewFeedback.addButtons([cancelButton]);			
		}

		function createDataFeedback(container,showAll) {
			var i = 0;
			var countFeedback = nodePLCO_CP_HR_ACTIVITY_FEEDBACK.count();  
			var tooltipRate = meta4.data.utils.getValue(nodePLCO_CP_MT_HR_ROLE, 'PLCO_REVIEW_SCALE_DESCRIPTION');

			if (countFeedback === 0){
				var labelDateFeedback = new Element('p', {
					'text' : meta4.widget.translate.getTranslate('_no_data_feedback')
				});	
                container.addClass('noFeedback');
				container.grab(labelDateFeedback);
				return true;
			}

			// calculamos cuantos registros hay que mostrar
			var numReg;
			var showButtonMore,showButtonLess;
			if (showAll){
				numReg = countFeedback; // mostramos todos
				showButtonMore = false;
			} else {
				if (countFeedback <= numMaxFeedback){
					numReg = countFeedback; // mostramos todos porque tiene menos registros que el maximo a mostrar
					showButtonMore = false;
				} else {
					numReg = numMaxFeedback; // mostramos solo los N primeros registros (siendo N = numMaxFeedback)
					showButtonMore = true;
				}
			}

			showButtonLess = false;
			if (numReg > numMaxFeedback){
				showButtonLess = true;
			}
						
			for (i = 0; i < numReg; i++) {
				nodePLCO_CP_HR_ACTIVITY_FEEDBACK.moveTo(i);
				 
				/// Obtenemos los valores:
				var valuesItems = meta4.data.utils.getValues(nodePLCO_CP_HR_ACTIVITY_FEEDBACK, ['PLCO_FL_PHOTO_TOKEN', 'SCO_GB_NAME','PLCO_ORDER','PLCO_FEEDBACK_DATE','PLCO_DESCRIPTION'], null);
				var photo = valuesItems[0];
				var gbName = valuesItems[1];
				var numStars = valuesItems[2];		 
				var dateFeedback = valuesItems[3];	
				var descFeedback	 = valuesItems[4];	

				var divPhoto = new Element('div', {
					'class' : 'm4-photo size-m m4-minMarginRight'
				});

				var imgPhoto = new Element('img', {
					'src' : photo
				});

                divPhoto.grab(imgPhoto);
                var extraCommentClass = "";
                if (i>0){
                    extraCommentClass = "m4-minPaddingTop m4-minMarginTop m4-border1Top solid grey-border";
                }
				var divInfo = new Element('div', {
					'class' : 'm4-flex center noGrab m4-minPaddingLeft '+ extraCommentClass
                });
                var divInfoComment = new Element('div', {
					'class' : 'm4-minMarginTop m4-minMarginRight m4-minPaddingLeft'
				});

				var divInfoH3 = new Element('p', {
					'class' : 'm4-maxMarginRight',
					'text' : gbName
                });
                
                var divInfo2 = new Element('div', {
					'class' : 'm4-flex center itemToRight m4-minMarginRight',
				});
				 
				var labelDateFeedback = new Element('p', {
                    'class': 'm4-extraMarginRight',
					'text' : dateFeedback
				});				
				divInfo.adopt(divPhoto,divInfoH3,divInfo2);
            
				var optionsRate = {
					iconsToShow: 5,
					toolTip: tooltipRate,
					readOnly : true,
				};
				var rateReview = new meta4.widget.Rate(numStars, optionsRate);
                divInfo2.adopt(labelDateFeedback, rateReview.toElement());
                			
				var options = {	
					readOnly : true ,
					showImage: false
				};
				
				var comment = new meta4.widget.Comment(options);
				comment.setText(descFeedback);
				
				divInfoComment.grab(comment.toElement());				
				
				container.adopt(divInfo,divInfoComment);
			}

			if (showButtonMore) {
				// boton para mostrar más registros
				var optionsMore = {
					'events' : {
						'click' :  function(pos){
							nodePLCO_CP_HR_ACTIVITIES.moveTo(pos);
							reloadDataFeedback(pos,true)
						}.bind(this, nodePLCO_CP_HR_ACTIVITIES.getCurrent())
					},
				};
				var divButtonMore = new meta4.widget.Button(meta4.widget.translate.getTranslate('_show_more_feedback'), meta4.widget.icons.plus_circle_b_c, optionsMore);  
				container.grab(divButtonMore.container);				
			}
			
			if (showButtonLess) {
				// boton para mostrar menos registros
				var optionsLess = {
					'events' : {
						'click' :  function(pos){
							nodePLCO_CP_HR_ACTIVITIES.moveTo(pos);
							reloadDataFeedback(pos,false)
						}.bind(this, nodePLCO_CP_HR_ACTIVITIES.getCurrent())
					},
				};
				var divButtonLess = new meta4.widget.Button(meta4.widget.translate.getTranslate('_show_less_feedback'), meta4.widget.icons.minus_circle_b_c, optionsLess);  
				container.grab(divButtonLess.container);				
			}			
		}


		function reloadDataFeedback(pos,showAll) {
			var idDiv =  'divFeedback_'+ pos;
			var container = $(idDiv);
			if (container) { 
				container.empty();
			}
			createDataFeedback(container, showAll);
		}

		function createButtonsActions(m4NodeCurrent, showValues){
			var actions = [];

			// Options Buttons Grouped Actions

			// Editar			
			if (showValues.showEdit === 1){
				var btnEdit = {
					id: 'buttonEdit',
					title: meta4.widget.translate.getTranslate('_btnEdit'),
					functionClick: function (pos) {
						//alert('Editar');
						editActivity(pos); 	
					}.bind(this, m4NodeCurrent),
					'button': {
						'text': meta4.widget.translate.getTranslate('_btnEdit'),
						'icon': meta4.widget.icons.edit
					}
				};
				actions.push(btnEdit);
			}


			// Borrar
			if (showValues.showDelete === 1){
				var btnDelete = {
					//id: 'buttonDelete',
					title: meta4.widget.translate.getTranslate('_btnDelete'),
					functionClick: function (pos) {
						deleteAction(pos);
					}.bind(this, m4NodeCurrent),
					'button': {
						'text': meta4.widget.translate.getTranslate('_btnDelete'),
						'icon': meta4.widget.icons.delete_c
					}
				};
				actions.push(btnDelete);	
			}
	
			
			// DarFeedback
			if (showValues.showbtnAddFeedback === 1){
				var btnFeedback = {
					id: 'buttonFeedback_'+ m4NodeCurrent,
					title: meta4.widget.translate.getTranslate('_btnFeedback'),
					functionClick: function (pos) {
						newFeedback(pos);
					}.bind(this, m4NodeCurrent),
					'button': {
						'text': meta4.widget.translate.getTranslate('_btnFeedback'),
						'icon': meta4.widget.icons.bubble_pencil_ln
					}
				};
				actions.push(btnFeedback);	
			}
		

			// Cancelar
			if (showValues.showCancel === 1){
				var btnCancel = {
					id: 'buttonCancel_'+ m4NodeCurrent,
					title: meta4.widget.translate.getTranslate('_btnCancel'),
					functionClick: function (pos) {
						cancelAction(pos);
					}.bind(this, m4NodeCurrent),
					'button': {
						'text': meta4.widget.translate.getTranslate('_btnCancel'),
						'icon': meta4.widget.icons.stack_cancel
					}
				};
				actions.push(btnCancel);
			}	
			
			// Finalizar
			if (showValues.showFinish === 1){
				var btnFinish = {
					id: 'buttonComplete_'+ m4NodeCurrent,
					title: meta4.widget.translate.getTranslate('_btnComplete'),
					functionClick: function (pos) {
						finishAction(pos);
					}.bind(this, m4NodeCurrent),
					'button': {
						'text': meta4.widget.translate.getTranslate('_btnComplete'),
						'icon': meta4.widget.icons.finish
					}
				};
				actions.push(btnFinish);	
			}			
			
			// Pedir Feedback
			if (showValues.showAsk === 1){
				var btnAskFeedback = {
					id: 'buttonAskFeedback'+ m4NodeCurrent,
					title: meta4.widget.translate.getTranslate('_btnAskFeedback'),
					functionClick: function (pos) {
						askFeedback(pos);
					}.bind(this, m4NodeCurrent),
					'button': {
						'text': meta4.widget.translate.getTranslate('_btnAskFeedback'),
						'icon': meta4.widget.icons.users_group
					}
				};
				actions.push(btnAskFeedback);		
            }	
            
            return actions;
		}

		function createDataActivity(container) {
			// Construimos el Expander de la sección:
			var titleSection = ' ';

			//Creamos el feedback de la actividad:
			var content = new Element('div', {
                id : 'divFeedback_'+ nodePLCO_CP_HR_ACTIVITIES.getCurrent(),
                'class': 'm4-minMarginLeft m4-minMarginTop'
			}); // div para el feedback de la actividad 
			createDataFeedback(content,false);
						

			// Div Extracontent Expander:
			var divextracontent = new Element('div', {
                'class': 'm4-block m4-flex expand'			
			});

			var valuesItems = meta4.data.utils.getValues(nodePLCO_CP_HR_ACTIVITIES, ['PLCO_NM_ACTIVITY', 'SCO_NM_CP_STATUS','PLCO_START_DATE','PRP_NM_CRITERIA','SCO_GB_NAME','SCO_NM_CP_PRIORITY','PRP_SHOW_FEEDBACK','SCO_ID_CP_STATUS','PRP_SHOW_FINISH','PRP_SHOW_CANCEL','PRP_SHOW_DELETE','PLCO_END_DATE','PRP_SHOW_ASK','PRP_SHOW_EDIT'], null);
			var nameActivity = valuesItems[0];
			var nameStatus = valuesItems[1];		
			var dateAssign = valuesItems[2];	
			var nameCriteria = valuesItems[3];
			var personAssign = valuesItems[4];
			var namePriority = valuesItems[5];
			var showbtnAddFeedback = valuesItems[6];
			var idStatus = valuesItems[7];
			var showFinish = valuesItems[8];
			var showCancel = valuesItems[9];
			var showDelete = valuesItems[10];
			var dateFinish = valuesItems[11];
			var showAsk = valuesItems[12];
			var showEdit = valuesItems[13];
            var showValues = getShowValues();

			//Activity data:
			var divActivityData = new Element('div', {
				'class' : 'noOverflow flexGrow m4-maxPaddingRight m4-minPaddingTop m4-minPaddingBottom m4-minPaddingLeft m4-border1Right dark-border solid'				 
			});
			
			var labelNameActivity = new Element('h3', {
                'class': 'ellipsis m4-minMarginBottom',
				'text': nameActivity
			});
			divActivityData.grab(labelNameActivity);

            var divLineActivityData = new Element('div',{
                'class': 'm4-flex'
            });
			divActivityData.grab(divLineActivityData);

			var labelDateDiv = new Element('div', {
				'class': 'm4-flex noWrap center middle',
            });
            var labelDateIcon = new Element('img', {
                'class': 'm4-xsMarginRight',
                src: meta4.widget.icons.calendar
            });
            var labelDate = new Element('p', {
				'class': 'm4-extraMarginRight noWrap',
				'text': dateAssign,
				'title': nodePLCO_CP_HR_ACTIVITIES.getItemMetadata('PLCO_START_DATE').getProperty('Name')
            });
            labelDateDiv.adopt(labelDateIcon,labelDate);
			divLineActivityData.adopt(labelDateDiv);

			if (idStatus === '02'){
                labelDateIcon.src = meta4.widget.icons.calendar_g_c;
                var labelDateFinishDiv = new Element('div', {
                    'class': 'm4-flex noWrap center middle',
                });
                var labelDateFinishIcon = new Element('img', {
                    'class': 'm4-xsMarginRight',
                    src: meta4.widget.icons.calendar_r_c
                });
				var labelDateFinish = new Element('p', {
					'class': 'm4-extraMarginRight noWrap',
					'text': dateFinish,
					'title': nodePLCO_CP_HR_ACTIVITIES.getItemMetadata('PLCO_END_DATE').getProperty('Name')
                });	
                labelDateFinishDiv.adopt(labelDateFinishIcon,labelDateFinish);	
				divLineActivityData.adopt(labelDateFinishDiv);			
			}
	

			var labelPriorityDiv = new Element('div', {
				'class': 'm4-flex center',
            });		
            var labelPriority = new Element('p', {
				'class': 'm4-xsMarginRight grey-text noWrap',
				'text': nodePLCO_CP_HR_ACTIVITIES.getItemMetadata('SCO_NM_CP_PRIORITY').getProperty('Name')
            });	
            var labelPriorityName = new Element('p', {
				'class': 'm4-extraMarginRight ellipsis',
				'text': namePriority
            });	
            labelPriorityDiv.adopt(labelPriority,labelPriorityName);
			
			if ((nameCriteria) && (tabToshow === 'tab_by_date')){
                var labelCriteriaDiv = new Element('div', {
					'class': 'm4-flex center',
				});
				var labelCriteria = new Element('p', {
					'class': 'm4-xsMarginRight grey-text noWrap',
					'text': nodePLCO_CP_HR_ACTIVITIES.getItemMetadata('PRP_NM_CRITERIA').getProperty('Name')
                });	
                var labelCriteriaName = new Element('p', {
					'class': 'm4-extraMarginRight ellipsis',
					'text': nameCriteria
                });
                labelCriteriaDiv.adopt(labelCriteria, labelCriteriaName);
			} else {
				var labelCriteriaDiv = new Element('p', {
					'text': ' '
				});					
			}
		
			var labelPersonDiv = new Element('div', {
				'class': 'm4-flex center',
            });	
            var labelPerson = new Element('p', {
				'class': 'm4-xsMarginRight grey-text noWrap',
				'text': nodePLCO_CP_HR_ACTIVITIES.getItemMetadata('SCO_GB_NAME').getProperty('Name')
            });	
            var labelPersonName = new Element('p', {
				'class': 'm4-extraMarginRight ellipsis',
				'text': personAssign
            });	
            labelPersonDiv.adopt(labelPerson, labelPersonName);

			divLineActivityData.adopt(labelPriorityDiv,labelCriteriaDiv,labelPersonDiv);
									
			divextracontent.grab(divActivityData); 

			// Status
			var divStatusData = new Element('div', {
				'class' : 'm4-flex size120 center middle flexGrow m4-maxPaddingLeft m4-maxPaddingRight m4-border1Right dark-border solid'				 
			});
			var labelstatus = new Element('p', {
				'class': 'ellipsis',
				'text': nameStatus
			});		
			
			divStatusData.grab(labelstatus);

			var commentFinish = meta4.data.utils.getValue(nodePLCO_CP_HR_ACTIVITIES,'PLCO_COMMENT_FINISH');
			if ((idStatus === '02') && (commentFinish.length > 0)){
				// Comentario:
				var optionsBtnComment = {
					id:'btnShowComment',
					title: nodePLCO_CP_HR_ACTIVITIES.getItemMetadata('PLCO_COMMENT_FINISH').getProperty("Name"),
					'text': '',
					functionClick: function(pos,commentFinish) {
						var divPopUp = new Element('div');
						var title = nodePLCO_CP_HR_ACTIVITIES.getItemMetadata('PLCO_COMMENT_FINISH').getProperty("Name");
						var optionstextArea = {
							'id' : 'popupCommentFinish',
							'class' : 'm4-textAreaPopup m4-fullHeight',
							'readonly': true,
							'maxlength' : parseInt(nodePLCO_CP_HR_ACTIVITIES.getItemMetadata('PLCO_COMMENT_FINISH').getProperty("Precision"), 10)
						};  
						var textarea = new Element('textarea', optionstextArea);
						textarea.set('text', commentFinish);

						divPopUp.adopt(title, textarea);  	  	  	  

						var sections = [{
							text : 'section',
							mainElement : divPopUp
						}];

						var optionsPopUp = {
							title : title,
							sections : sections,
							classname : 'm4-popUpSize50'
						};
						new meta4.widget.popUpWindow(optionsPopUp);	 
					}.bind(this, nodePLCO_CP_HR_ACTIVITIES.getCurrent(),commentFinish)
				};
				
				var btnComment = new meta4.widget.Button(null, meta4.widget.icons.comment_c, optionsBtnComment);
				divStatusData.grab(btnComment.container);					
			}

			divextracontent.grab(divStatusData); 

            var divActions = new Element('div', {
                'class': 'm4-flex size120 center middle'
            });	
            divextracontent.grab(divActions);
			// Grouped Actions: solo si estado 01-en proceso
			if (idStatus === '01'){
				createButtonsActions(divActions,showbtnAddFeedback,showFinish,showCancel,showDelete,showAsk,showEdit);
			} else if ((idStatus === '02') && (showEdit === 1)){
				//finalizada: solo se puede editar
                var current = nodePLCO_CP_HR_ACTIVITIES.getCurrent();
                var actions = createButtonsActions(current, showValues);
                addButtonActions(current, divActions, actions);
			}

            
            //Collapse button
            var collapseButton = new Element('div', {
				'class': 'm4-flex center columnIco arrow grey-secondary',
            });	
            var options = {
				'classImg': 'm4-rotate deg180',
				'functionClick': function (object) {
					showHideComments(content);
					changeIconButton(this);
				}
            };

            function showHideComments(comments) {
                if (comments.hasClass('hidden')) {
                    comments.removeClass('hidden');
                } else {
                    comments.addClass('hidden');
                }
            }

            function changeIconButton(obj) {
                if (obj.img.hasClass('deg180')) {
                    obj.img.removeClass('deg180');
                } else {
                    obj.img.addClass('deg180');
                }
            }

			var iconExpand = new meta4.widget.Button('', meta4.widget.icons.arrow_down_b_c, options);

            collapseButton.grab(iconExpand.container);
            
            divextracontent.grab(collapseButton);
            
            var expanderContainerDiv = new Element('div', {
				'class': 'm4-fullWidth m4-maxMarginBottom',
            });	
            expanderContainerDiv.adopt(divextracontent,content);
            container.grab(expanderContainerDiv);
		}

		function createActivities(container) {
            var i = 0;
            var countActivities = nodePLCO_CP_HR_ACTIVITIES.count();           
            for (i = 0; i < countActivities; i++) {
				nodePLCO_CP_HR_ACTIVITIES.moveTo(i);
				createDataActivity(container);
			}
		}
 
		function createActivitiesByCriteria(container) {
            var i = 0;
			var countActivities = nodePLCO_CP_HR_ACTIVITIES.count();           
			var nmCriteriaOld = null;
			var nmCriteria = null;
			var existsActivityWithCriteria = false;

            for (i = 0; i < countActivities; i++) {
				nodePLCO_CP_HR_ACTIVITIES.moveTo(i);				
				nmCriteria = meta4.data.utils.getValue(nodePLCO_CP_HR_ACTIVITIES, 'PRP_NM_CRITERIA'); 
				if (nmCriteria.length > 0){
					existsActivityWithCriteria = true;
					if (nmCriteria != nmCriteriaOld){
						nmCriteriaOld = nmCriteria; //actualizamos para la siguiente iteración
						// Creamos el expander:
						var options = {
							iconHide : meta4.widget.icons.triangle_down_c,
							iconShow : meta4.widget.icons.triangle_right_c,
							label : 'h3',
							classContent : 'm4-maxPaddingLeft'
						};	
						var content = new Element('div' );
						var expander = new meta4.widget.Expander(nmCriteria, content, options);	
						container.grab(expander.toElement());	
					}		
					createDataActivity(content);													
				}
			}		

			// si ninguna tiene criterios lo indicamos:
			if (existsActivityWithCriteria === false) {			 
				var divNoCriteria = new Element('div', {'class' : 'm4-flex columns center vCenter m4-mainHelp'});				 
				var pNoCriteria = new Element('h3', {'text' : meta4.widget.translate.getTranslate('_no_activity_criteria')});
				divNoCriteria.adopt(pNoCriteria);
				container.grab(divNoCriteria);
			}
		}

		function realoadDataEmployee(container) {
			 
			var contentBlock  = new Element('div', {
                'id': 'contentActivities' + '_' + tabToshow,
                'class': 'm4-flex columns'
            }); 
			var countData = nodePLCO_CP_HR_ACTIVITIES.count();
	
			if (countData === 0) {
				var containerData = $('containerTables');
				containerData.empty();

				var noData=NoActivity();
				contentBlock.grab(noData);		
				container.grab(contentBlock);	
			} else {
				var divTabByDate = $('contentActivities_tab_by_date');
				if (divTabByDate) {
					divTabByDate.empty();
				} else {
					divTabByDate  = new Element('div', {
						'id': 'contentActivities_tab_by_date',
						'class': 'm4-flex columns'
					});
				}

				var divTabByCriteria = $('contentActivities_tab_by_criteria');
				if (divTabByCriteria) {
					divTabByCriteria.empty();
				} else {
					divTabByCriteria  = new Element('div', {
						'id': 'contentActivities_tab_by_criteria',
						'class': 'm4-flex columns'
					}); 
				}
				if (tabToshow === 'tab_by_criteria'){
					createActivitiesByCriteria(divTabByCriteria); 
				} else {
					createActivities(divTabByDate); 
				}	

			} 
		}

		function createDataEmployee(container) {
		
			var contentBlock  = new Element('div', {
                'id': 'contentActivities' + '_' + tabToshow,
                'class': 'm4-flex columns'
            }); 
			var countData = nodePLCO_CP_HR_ACTIVITIES.count();
	
			if (countData === 0) {
				var noData=NoActivity();
				contentBlock.grab(noData);		
				container.grab(contentBlock);	
			} else {
				// Pintamos las pestañas:	
				var divTabByDate = $('contentActivities_tab_by_date');
				if (divTabByDate) {
					divTabByDate.empty();
				} else {
					divTabByDate  = new Element('div', {
						'id': 'contentActivities_tab_by_date',
						'class': 'm4-flex columns'
					});
				}

				var divTabByCriteria = $('contentActivities_tab_by_criteria');
				if (divTabByCriteria) {
					divTabByCriteria.empty();
				} else {
					divTabByCriteria  = new Element('div', {
						'id': 'contentActivities_tab_by_criteria',
						'class': 'm4-flex columns'
					}); 
				}				
				var optionsTab = {
					id: 'testTabCarrusel',
					tabs: [
						{
							id: 'tab_by_date',
							title: meta4.widget.translate.getTranslate('_activity_by_date'),
							 content: divTabByDate,					
							functionClick: function() {								 
								tabToshow = 'tab_by_date';
								divTabByDate.empty();								
								function paintOrderByDate(divTabByDate){
									createActivities(divTabByDate);
									this.fireEvent('done');
								} 												
								var request = new meta4.M4Request(t3PLCO_CP_MT_HR_ROLE, 'PLCO_CP_HR_ACTIVITIES', 'PLCO_SORT', [1]);
								meta4.data.execute(request, paintOrderByDate.bind(this,divTabByDate));							
							}
						},						
						{
							id: 'tab_by_criteria',
							title: meta4.widget.translate.getTranslate('_activity_by_criteria'),
							content: divTabByCriteria,
							functionClick: function() {
								tabToshow = 'tab_by_criteria';
								divTabByCriteria.empty();
								function paintOrderByCriteria(divTabByCriteria){
									createActivitiesByCriteria(divTabByCriteria);
									this.fireEvent('done');
								} 
								var request = new meta4.M4Request(t3PLCO_CP_MT_HR_ROLE, 'PLCO_CP_HR_ACTIVITIES', 'PLCO_SORT', [2]);
								meta4.data.execute(request, paintOrderByCriteria.bind(this,divTabByCriteria)); 							 	 
							}						 							 
						},
						
					]
				};
				
				var tab = new meta4.widget.Tab(optionsTab);
				if (hasCriteria != '1') {
					tab.removeTab('tab_by_criteria'); // solo  hay una pestaña, no hay criterios
				}
				container.grab(tab);

				if (tabToshow === 'tab_by_date'){
					createActivities(divTabByDate) ;
				} else if (tabToshow === 'tab_by_criteria') {		
					createActivitiesByCriteria(divTabByCriteria);
					tab.activateTab('tab_by_criteria');
				}			 			
			}			
		}



		function newActivity() {
			function closeForm(request) {
				var retValue = parseInt(request.getResult());
				if (retValue !== -1) {
					form.destroyPopUp();	
					document.removeEvent("onCloseHandler", onCloseHandler);
				} 
			}
			var onCloseHandler = function(e) {
				var request = new meta4.M4Request(t3PLCO_CP_MT_HR_ROLE, 'PLCO_CP_HR_ACTIVITIES', 'DESTROYREGISTER', null);
				meta4.data.execute(request,closeForm);	

			};
			document.addEvent("onCloseHandler", onCloseHandler);
			 
			var validationsForm = getValidationsForm();

			var optionsForm = {
				allowCheckForm: true,
				makePopUp : true,
				//description : '*** description',
				title : meta4.widget.translate.getTranslate('_activity_add'),
				addRegister : true,
				makePopUpCloseEvent : 'onCloseHandler',
			//	classPopUp : 'm4-popUpSize50',
				validations: validationsForm,
				itemTypes : {
					'PLCO_NM_ACTIVITY' : {
						'nodeName' : meta4.widget.TypeElement.input,
						isPk: true
					},
					'SCO_ID_CP_PRIORITY' : {
						'nodeName': meta4.widget.TypeElement.m4Select,
						'idNodeAux': 'PLCO_CP_PRIORITY',
						'idItemNameAux': 'SCO_NM_CP_PRIORITY',
						'idItemValueAux': 'SCO_ID_CP_PRIORITY',
						'nullValue' : false,
						showDefaultValueWhenTitle : true,
					},
					'SCO_NM_EXTD_KN' : {
						'nodeName' : meta4.widget.TypeElement.m4ListJS,
						'meta4Object' : _t3PLCO_CP_MT_KNOW_MAP,
						

						'nodeQBFId' : 'PLCO_CP_QBF_KNOW_MAP',
						'itemsSearch' : 'SCO_NM_EXTD_KN', 
						'nodeTRId' : 'PLCO_CP_MT_KNOW_MAP',
						'itemResult' : 'SCO_NM_EXTD_KN', 

						'showRecents' : false ,
						
						'alternativeResult' : [{
							itemQBF : 'SCO_ID_EXTD_KN', 
							item : 'SCO_ID_EXTD_KN'
						}],
						'onValidValue' : function(obj)  {
							if (hasCriObjCuan==="1"){
								if (obj.value.length > 0) {
								
									form._elementsForm["SCO_NM_OBJECTIVE_C"].m4Disabled();
								}else{
									form._elementsForm["SCO_NM_OBJECTIVE_C"].m4Enabled();
								}
								}
							if (hasCriObjCual==="1"){
								if (obj.value.length > 0) {
								
									form._elementsForm["SCO_NM_OBJECTIVE_CL"].m4Disabled();
								}else{
									form._elementsForm["SCO_NM_OBJECTIVE_CL"].m4Enabled();
								}
								}
						}


					},

					'SCO_NM_OBJECTIVE_C' : {
						'nodeName' : meta4.widget.TypeElement.m4ListJS,
						'meta4Object' : _t3PLCO_CP_MT_OBJ_CUAN,
						'showRecents' : false ,

						'nodeQBFId' : 'PLCO_CP_QBF_OBJ_CUAN',
						'itemsSearch' : 'SCO_NM_OBJECTIVE', 
						'nodeTRId' : 'PLCO_CP_MT_OBJ_CUAN',
						'itemResult' : 'SCO_NM_OBJECTIVE',
					
					
						
						'alternativeResult' : [{
							itemQBF : 'SCO_ID_OBJECTIVE', 
							item : 'SCO_ID_OBJ_CUANTI'
						}],
					
						'onValidValue' : function(obj)  {
							if (hasCriEk==="1"){
							if (obj.value.length > 0) {
							
								form._elementsForm["SCO_NM_EXTD_KN"].m4Disabled();
							}else{
								form._elementsForm["SCO_NM_EXTD_KN"].m4Enabled();
							}
							}
							if (hasCriObjCual==="1"){
								if (obj.value.length > 0) {
								
									form._elementsForm["SCO_NM_OBJECTIVE_CL"].m4Disabled();
								}else{
									form._elementsForm["SCO_NM_OBJECTIVE_CL"].m4Enabled();
								}
								}
						}

					},
					'SCO_NM_OBJECTIVE_CL' : {
						'nodeName' : meta4.widget.TypeElement.m4ListJS,
						'meta4Object' : _t3PLCO_CP_MT_OBJ_CUALI,
						
						'showRecents' : false ,
						'nodeQBFId' : 'PLCO_CP_QBF_OBJ_CUALI',
						'itemsSearch' : 'SCO_NM_OBJECTIVE', 
						'nodeTRId' : 'PLCO_CP_MT_OBJ_CUALI',
						'itemResult' : 'SCO_NM_OBJECTIVE', 
						
					
						
						'alternativeResult' : [{
							itemQBF : 'SCO_ID_OBJECTIVE', 
							item : 'SCO_ID_OBJ_CUALI'
						}],
					
						'onValidValue' : function(obj)  {
							if (hasCriEk==="1"){
							if (obj.value.length > 0) {
							
								form._elementsForm["SCO_NM_EXTD_KN"].m4Disabled();
							}else{
								form._elementsForm["SCO_NM_EXTD_KN"].m4Enabled();
							}
							}
							if (hasCriObjCuan==="1"){
								if (obj.value.length > 0) {
								
									form._elementsForm["SCO_NM_OBJECTIVE_C"].m4Disabled();
								}else{
									form._elementsForm["SCO_NM_OBJECTIVE_C"].m4Enabled();
								}
								}
						}


					},
					

					'SCO_ID_CP_STATUS' : {
						'nodeName': meta4.widget.TypeElement.m4Select,
						'idNodeAux': 'PLCO_CP_STATUS',
						'idItemNameAux': 'SCO_NM_CP_STATUS',
						'idItemValueAux': 'SCO_ID_CP_STATUS',
						'nullValue' : false,
						showDefaultValueWhenTitle : true,
					},							
				}
			};		
		
		
			if (hasCriEk==="0"){
				delete optionsForm.itemTypes["SCO_NM_EXTD_KN"];
			}
			if (hasCriObjCuan==="0"){
				delete optionsForm.itemTypes["SCO_NM_OBJECTIVE_C"];
			}
			if (hasCriObjCual==="0"){
				delete optionsForm.itemTypes["SCO_NM_OBJECTIVE_CL"];
			}
			var form = new meta4.widget.Form(t3PLCO_CP_MT_HR_ROLE, 'PLCO_CP_HR_ACTIVITIES', optionsForm);	

					
			// Boton Grabar
			var optionsSaveNewButton = {
                'id': 'btnCancelPaintForm',
                'class': 'm4-minMarginRight',
				'typeButton' : 'primary',
				'm4autoTooltip' : false,
				'events' : {
					'click' : function(){
						function showMessage(request){
							var retValue = parseInt(request.getResult());
							if (retValue !== -1) {
								meta4.data.showPopUpWrapData(meta4.widget.translate.getTranslate('_saveOk')); 
								form.destroyPopUp();
								// Repintamos
								var containerData = $('containerTables');								
								var countData = nodePLCO_CP_HR_ACTIVITIES.count();
								if(countData === 1){
									createDataEmployee(containerData);
								}else{
									realoadDataEmployee(containerData);
								}
							}
						}
						var request = new meta4.M4Request(t3PLCO_CP_MT_HR_ROLE, 'PLCO_CP_HR_ACTIVITIES', 'PLCO_SAVE_NEW_ACTIVITY', null);
						meta4.data.execute(request, showMessage);
					}
				}
			};
			var saveNewButton = new meta4.widget.Button(meta4.widget.translate.getTranslate('_saveAddActivity'),'',optionsSaveNewButton);
			form.addButtons([saveNewButton]);
			
			form.addEvent('hasFormErrors', function (hasFormErrors) {
				if (hasFormErrors) {
					saveNewButton.m4Disabled();
				} else {
					saveNewButton.m4Enabled();
				}
			});
			form.hasFormErrors(true); // para que al crearlo este el boton deshabilitado					
			
			// Boton Cancelar
			var optionsCancelButton = {
				'id': 'btnCancelPaintForm',
				'typeButton' : 'secondary',
				'm4autoTooltip' : false,
				'events' : {
				'click' : function(){
					onCloseHandler();
					}
				}
			};
			var cancelButton = new meta4.widget.Button(meta4.widget.translate.getTranslate('_close'),'',optionsCancelButton);
			form.addButtons([cancelButton]);			
		}

		function createHeader(container) {

			/// Obtenemos los valores:
			var valuesItems = meta4.data.utils.getValues(nodePLCO_CP_MT_HR_ROLE, ['PLCO_FL_PHOTO_TOKEN', 'SCO_GB_NAME','SCO_ID_HR','STD_N_WORK_UNIT','STD_N_JOB_CODE','PRP_TYPE_PERSON_CONNECTED'], null);
			var photo = valuesItems[0];
			var gbName = valuesItems[1];
			var idEmployee = valuesItems[2];		 
			var nmWorkUnit = valuesItems[3];	
			var nmJob	 = valuesItems[4];	
			var nHrType	 = valuesItems[5];

			var divHeader = new Element('div', {
				'class': 'm4-flex center m4-fullWidth'
			});

			var divPhoto = new Element('div', {
				'class' : 'm4-header-divPhoto'
			});

			var imgPhoto = new Element('img', {
				'src' : photo
			});

			divPhoto.grab(imgPhoto);

			var divInfo = new Element('div', {
				'class' : 'm4-header-divInfo'
			});

			var divInfoH3 = new Element('h3', {
				'class' : 'm4-header-name',
				'text' : gbName
			});

			var divInfoSpan = new Element('span', {
				'class': 'grey-text m4-minPaddingLeft',
				'text': idEmployee
			});	
			divInfoH3.grab(divInfoSpan);

			var divInfoP1 = new Element('p', {'class': 'm4-header-info'});
			var spanType = new Element('span', {
				'class': 'm4-header-info',
				'text':  nmJob
			});			
			divInfoP1.grab(spanType);
			
			var divInfoP2 = new Element('p', {
				'class': 'm4-header-info',
				'text': nmWorkUnit
			});			
			
			var divInfoP3 = new Element('p', {
				'class': 'm4-header-info',
				'text': nHrType
			});
			
			divInfo.adopt(divInfoH3, divInfoP1, divInfoP2,divInfoP3);
			if (empType==="0"){
			//boton para añadir un nueva actividad
			var divAditional = new Element('div', {
				'class': 'm4-header-aditional m4-textRight m4-extraPaddingRight',
	
				'id': 'm4-header-new'
			});
			var contAditional = new Element('div', {
				'class': 'formAditional'
			});

			var optAddDoc = {
				'class': 'm4-minMarginRight',
				'title': meta4.widget.translate.getTranslate('_activity_add'),
				'functionClick': function() {
					newActivity();			
				}
			};
			
			var btnAddDocument = new meta4.widget.Button(meta4.widget.translate.getTranslate('_activity_add'), meta4.widget.icons.file_write, optAddDoc);
			contAditional.adopt(btnAddDocument.container);
			divAditional.grab(contAditional);
			divHeader.adopt(divPhoto, divInfo, divAditional);
		}else{
			divHeader.adopt(divPhoto, divInfo);	
		}
			container.adopt(divHeader);
			meta4.widget.utils.setFixedHeaderCollapse();
		}

		function paintPanelCenter() {
	
			var containerData = $('containerTables');
            containerData.empty();
            var containerHeader = $('m4-header-content');
            containerHeader.empty();
		    createHeader(containerHeader);
			createDataEmployee(containerData);

		}
		
		function personClick () {	
			var request = new meta4.M4Request(t3PLCO_CP_MT_HR_ROLE, PLCO_CP_MT_HR_ROLE, 'PLCO_LOAD_ACTIVITY', null);
			empType=meta4.data.utils.getValue(nodePLCO_CP_MT_HR_ROLE, 'PLCO_EMP_TYPE');
			if ( empType=== "0"){
				if( hasCriteria=== null) {
					hasCriteria=meta4.data.utils.getValue(nodePLCO_CP_MT_HR_ROLE, 'PLCO_WITH_CRITERIA');
					hasCriEk=meta4.data.utils.getValue(nodePLCO_CP_MT_HR_ROLE, 'PLCO_WITH_EK');
					hasCriObjCuan=meta4.data.utils.getValue(nodePLCO_CP_MT_HR_ROLE, 'PLCO_WITH_OBJ_CUAN');
					hasCriObjCual=meta4.data.utils.getValue(nodePLCO_CP_MT_HR_ROLE, 'PLCO_WITH_OBJ_CUAL');
				}	
				if (hasCriEk==="1"){ 
					if( _t3PLCO_CP_MT_KNOW_MAP=== null) {
						_t3PLCO_CP_MT_KNOW_MAP = new meta4.M4Object('PLCO_CP_MT_KNOW_MAP', 'PLCO_CP_MT_KNOW_MAP');
					}
					request.addReference('PLCO_CP_MT_KNOW_MAP', _t3PLCO_CP_MT_KNOW_MAP);
				}
				if (hasCriObjCuan==="1"){ 
					if( _t3PLCO_CP_MT_OBJ_CUAN=== null) {
						_t3PLCO_CP_MT_OBJ_CUAN = new meta4.M4Object('PLCO_CP_MT_OBJ_CUAN', 'PLCO_CP_MT_OBJ_CUAN');
					}
					request.addReference('PLCO_CP_MT_OBJ_CUAN', _t3PLCO_CP_MT_OBJ_CUAN);
				}
				if (hasCriObjCual==="1"){ 
					if( _t3PLCO_CP_MT_OBJ_CUALI=== null) {
						_t3PLCO_CP_MT_OBJ_CUALI = new meta4.M4Object('PLCO_CP_MT_OBJ_CUALI', 'PLCO_CP_MT_OBJ_CUALI');
					}
					request.addReference('PLCO_CP_MT_OBJ_CUALI', _t3PLCO_CP_MT_OBJ_CUALI);
				}
            } 
            
			meta4.data.execute(request, paintPanelCenter);	
		}


		function drawListInfo(event) {
			if (nodePLCO_CP_MT_HR_ROLE.count() > 0){
			
				nodePLCO_CP_MT_HR_ROLE.moveTo(0);
				personClick();
			} else {
				// no data
				var containerData = $('containerTables');
				containerData.empty();				
			}					
		}

		function paintTableLeft() {
			$('tables-panel-left').empty();
			var tableLeft = new meta4.widget.PersonsList('tables-panel-left');

			var options = {
				header : false,
				collapsableHeader : false,
				slider : false,
				allowSelection : true,
				onRowClick : personClick, 
				onDataDraw : drawListInfo, 
				idItemImg : 'PLCO_FL_PHOTO_TOKEN', 
				idsItems : ['SCO_GB_NAME','STD_N_JOB_CODE', 'STD_N_WORK_UNIT','PRP_TYPE_PERSON_CONNECTED'],		
                nodeSearch : 'PLCO_CP_QBF_HR_ROLE',
                imgClass: 'm4-listPerson-img'
			};
			tableLeft.drawPersonsList(t3PLCO_CP_MT_HR_ROLE, 'PLCO_CP_MT_HR_ROLE', options);

			//set class first
			var divsTable = $('tables-panel-left').getElement('tbody').getElement('tr:first-child');
			if (divsTable) {
				divsTable.addClass('m4Selected');
			}

		}
			 
		// Pinta los Splitt en paneles Izquierdo y Derecho
		function paintSplit() {
			meta4.widget.utils.makeSplitHorizontal($('panel-left'), $('panel-center'), [17, 35], true);
		}

		function paintTitleBar() {
			var options = {
				'elements' : [{
					'type' : 'help',
					'tooltip' : meta4.widget.translate.getTranslate('_cont_appraisal_help')
				}, {
					'type' : 'title',
					'text' : nodePLCO_CP_MT_HR_ROLE.getNodeMetadata('PLCO_CP_MT_HR_ROLE').getProperty('Name')
				}
				/*, {

					'type' : 'widgetbutton',
					'text' : meta4.widget.translate.getTranslate('_save'),
					'tooltip' : meta4.widget.translate.getTranslate('_save'),
					'options' : {
						'id' : 'save',
						'typeButton' : 'primary',
						'functionClick' : function() {
						alert('save');
						}
					}
				}
			*/]
			};
			var titlebar = new meta4.widget.titlebar('header', options);			 	
		}

        function paintDom() {
			paintTitleBar();
	        paintSplit(); 		
		    paintTableLeft();			
        }

		function _init() {

			t3PLCO_CP_MT_HR_ROLE = new meta4.M4Object(PLCO_CP_MT_HR_ROLE, PLCO_CP_MT_HR_ROLE);
			meta4.widget.utils.closingChecker(t3PLCO_CP_MT_HR_ROLE);
	
			
			$(document.head).getElement('title').set('text', t3PLCO_CP_MT_HR_ROLE.getObjectMetadata().getProperty('Name'));
	
			var request = new meta4.M4Request(t3PLCO_CP_MT_HR_ROLE, PLCO_CP_MT_HR_ROLE, 'PLCO_BEFORE_LOAD', null);
			meta4.data.execute(request, onInitSuccess);
	
			$('main').setStyle('visibility', 'visible');
        }

        // AUTOMATION TEST REFACTOR > Getter and Setters
        function getShowValues(valuesItems){
            var _defaultHidden = 0;

            var showbtnAddFeedback = valuesItems[6] ? valuesItems[6] : _defaultHidden;
            var showFinish = valuesItems[8] ? valuesItems[8] : _defaultHidden;
            var showCancel = valuesItems[9] ? valuesItems[9] : _defaultHidden;
            var showDelete = valuesItems[10] ? valuesItems[10] : _defaultHidden;
            var showAsk = valuesItems[12] ? valuesItems[12] : _defaultHidden;
            var showEdit = valuesItems[13] ? valuesItems[13] : _defaultHidden;

            return {
                showEdit: showEdit,
                showDelete: showDelete,
                showbtnAddFeedback: showbtnAddFeedback,
                showCancel: showCancel,
                showFinish: showFinish,
                showAsk: showAsk,
            }
        }

        function addButtonActions(m4NodeCurrent, container, buttonsAction){
            if(!container){
                return;
            }

            var actionsOptions = {
				id: 'groupedActionsMain_'+ m4NodeCurrent,
				label: meta4.widget.translate.getTranslate('_btnActions')
			};
			
            var groupedActions = new meta4.widget.GroupedActions(container, actionsOptions);
            
            groupedActions.add(buttonsAction);
        }

        function onInitSuccess(){
            _initNodes(t3PLCO_CP_MT_HR_ROLE);
            paintDom();
        }
        
        function _initNodes(){
			_setNode_PlcoCpMtHrRole();
			_setNode_PlcoCpHrActivities();
			_setNode_PlcoCpHrActivityFeedback();
        }

        function _clearPrivateAttributes(){
            t3PLCO_CP_MT_HR_ROLE = null;
            nodePLCO_CP_MT_HR_ROLE = null;
            nodePLCO_CP_HR_ACTIVITIES = null;
            nodePLCO_CP_HR_ACTIVITY_FEEDBACK = null;

            _t3PLCO_CP_MT_KNOW_MAP = null;
            _t3PLCO_CP_MT_OBJ_CUAN = null;
            _t3PLCO_CP_MT_OBJ_CUALI = null;
            
            empType= null;
            hasCriteria= null;
            hasCriEk= null;
            hasCriObjCuan= null;
            hasCriObjCual= null;
        }
                
        function _setHasCriteria(criteriaValue){
            hasCriteria = criteriaValue;
        }

        function _getNode_PlcoCpHrActivities(){
            return nodePLCO_CP_HR_ACTIVITIES;
        }

        function _setNode_PlcoCpHrActivities(){
            nodePLCO_CP_HR_ACTIVITIES = _getMObject_PlcoCpMtHrRole().getNode('PLCO_CP_HR_ACTIVITIES');
        }

        function _setNode_PlcoCpMtHrRole(){
            nodePLCO_CP_MT_HR_ROLE = _getMObject_PlcoCpMtHrRole().getNode('PLCO_CP_MT_HR_ROLE');
        }

        function _setNode_PlcoCpHrActivityFeedback(){
            nodePLCO_CP_HR_ACTIVITY_FEEDBACK = _getMObject_PlcoCpMtHrRole().getNode('PLCO_CP_HR_ACTIVITY_FEEDBACK');
        }

        function _setM4Object_PlcoCpMtHrRole(m4object){
            t3PLCO_CP_MT_HR_ROLE = m4object;
        }

        function _getMObject_PlcoCpMtHrRole(){
            return t3PLCO_CP_MT_HR_ROLE;
        }
        
        var __test__only__ = {};
        __test__only__._clearPrivateAttributes = _clearPrivateAttributes;
        __test__only__._setNode_PlcoCpHrActivities = _setNode_PlcoCpHrActivities;
        __test__only__._setNode_PlcoCpMtHrRole = _setNode_PlcoCpMtHrRole;
        __test__only__._setM4Object_PlcoCpMtHrRole = _setM4Object_PlcoCpMtHrRole;
        __test__only__._setHasCriteria = _setHasCriteria;
        __test__only__._getNode_PlcoCpHrActivities = _getNode_PlcoCpHrActivities;
        __test__only__.createButtonsActions = createButtonsActions;
        __test__only__.addButtonActions = addButtonActions;
        __test__only__.finishAction = finishAction;
        __test__only__.personClick = personClick;

		return {
            init : _init,
            __test__only__: __test__only__
		};

	}());

document.addEvent('meta4Ready', meta4.cont_appraisal.cont_appraisal_ess.init);
