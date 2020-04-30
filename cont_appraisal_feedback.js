var meta4 = meta4 || {};
var isMobile = meta4.getCookie('Meta4ProductCookie');
var htmlContainer = $(document.html);

 meta4.review_and_recommend_course  = (function () {
	'use strict';

	isMobile = false;/// modificar

	var PLCO_CP_FEEDBACK_REQUESTED = 'PLCO_CP_FEEDBACK_REQUESTED';
	var t3PLCO_CP_FEEDBACK_REQUESTED = null;
	var nodePLCO_CP_FEEDBACK_REQUESTED = null;
	var _workItem = null;
	var numIconsToShow = 5;
	 
	var nodePLCO_CP_REQ_ACTIVITY_FEEDBACK = "";

	var isBPO = false; // Si es BPO no se puede volver a Mis Tareas
	var sendOk = false;

	function goMyTask() {
		if(isMobile){
			window.location = '/mobile/m4task.html';
		}else{
			if (window.parent.meta4.portal && window.parent.meta4.portal.IFrame) {
				window.parent.meta4.portal.IFrame.navigateIframe(meta4.javaserverpages.go_task, true);
			} else {
				window.location.href = meta4.javaserverpages.go_task;
			}
		}
	}

	function createtitleBar() {
		var textTitle, textHelp;
 
		textTitle = meta4.widget.translate.getTranslate('_feedback') ;
		textHelp = meta4.widget.translate.getTranslate('_feedback_help') ;
		
		if ( (meta4.M4Executor.isLocalExecution()) || (isBPO)) {
			var options = {
				'elements' : [{
					'type' : 'help',
					'tooltip' : textHelp
				},{
					'type' : 'title',
					'text' :  textTitle
				}]
			};			
		} else {
			var options = {
				'elements' : [{
					'type' : 'widgetbutton',
					'position' : 'back',
					'text' : meta4.widget.translate.getTranslate('_back'),
					'img' : meta4.widget.icons.back,
					'options':{
						'title' : meta4.widget.translate.getTranslate('_my_task'),
						'functionClick' : goMyTask
					}
				},{
					'type' : 'help',
					'tooltip' : textHelp
				},{
					'type' : 'title',
					'text' :  textTitle
				}]
			};
		}
		var titlebar = new meta4.widget.titlebar('m4-titleBar', options);
	}

	function createHeader(){

		var container = $('m4-header-content');
		
		var divActivityInfo = new Element('div', {
			'class' : 'm4-minPaddingLeft m4-flex center'
		});
		
		var pActivityName = new Element('h3', {
			'class' : 'm4-xxlMarginRight',
			'text': meta4.data.utils.getValue(nodePLCO_CP_FEEDBACK_REQUESTED,'PLCO_NM_ACTIVITY')  
		});
		
		var divEmployee = new Element('div', {
			'class' : 'm4-flex center'
		});
		var pEmployeeName = new Element('p', {
			'class' : 'm4-xlMarginRight grey-text',
			'text':  meta4.data.utils.getValue(nodePLCO_CP_FEEDBACK_REQUESTED,'SCO_GB_NAME') ,
			'title' : meta4.widget.translate.getTranslate('_employee')
		});
		var pPriority = new Element('p', {
			'class' : 'm4-xlMarginRight grey-text',
			'text': meta4.widget.translate.getTranslate('_priority') + ' ' +  meta4.data.utils.getValue(nodePLCO_CP_FEEDBACK_REQUESTED,'SCO_NM_CP_PRIORITY')  
		});

		divEmployee.adopt(pEmployeeName, pPriority);

		divActivityInfo.adopt(pActivityName, divEmployee);
		container.adopt(divActivityInfo);
	}

	function createContent(){
	
		var container = $('containerTables');
		var headerContainer = $('header');
		var labelOrientation = null;

		if(isMobile){
			labelOrientation = 'right';
			//Div con el botón de confirmar para móviles
			var divButtonsContainer = new Element('div', {
				'class' : 'm4-flex center m4-fullWidth divButtonsContainer'
			});
			htmlContainer.grab(divButtonsContainer);
			
			//Botón de volver cabecera móviles
			var backButtonContainer = new Element('div', {
				'class' : 'backButtonContainer',
				'events' : {
					'click' : function(){
						window.history.back();
					}
				}
			});
			var backButton = new Element('img', {
				'class' : 'backButton',
				src : '/mobile_func/images/back_mobile.svg',
			});
			backButtonContainer.grab(backButton);

			//Botón de home cabecera móviles
			var homeButtonContainer = new Element('div', {
				'class' : 'homeButtonContainer',
				'events' : {
					'click' : function(){
						window.location = '/mobile/m4home.html';
					}
				}
			});
			var homeButton = new Element('img', {
				'class' : 'homeButton',
				src : '/mobile_func/images/home_mobile.svg',
			});
			homeButtonContainer.grab(homeButton);

			headerContainer.adopt(backButtonContainer, homeButtonContainer);
		}

		// Validations
		var validationForms = [];	
		 
		var controlPLCO_ORDER = function(value) {
			var orderSelected = meta4.data.utils.getValue(nodePLCO_CP_REQ_ACTIVITY_FEEDBACK, 'PLCO_ORDER');
			if (( (value !== '') && (orderSelected > 0) )  ){
				return true;
			} else {
				return false;
			}
		};
		var msgValReview = meta4.widget.translate.getTranslate('_error_add_feedback');
		var objValidationOrder = ['validationReview', 'PLCO_DESCRIPTION', controlPLCO_ORDER, msgValReview];
		
		validationForms.push(objValidationOrder);	
		
 
 
		// itemTypes
		var itemTypes = {};

		var options = {
			allowCheckForm : true,
			addRegister : true,
			makePopUp: false, 
			'class' : 'm4-form-without-popUp lightBackground',
			title: '',  
			focusInFirstElement: false,			
			validations : validationForms
		}; 

		itemTypes.PLCO_ORDER = {
			labelOrientation : labelOrientation,
			nodeName : meta4.widget.TypeElement.rate,
			iconsToShow: numIconsToShow,
			toolTip: meta4.data.utils.getValue(nodePLCO_CP_FEEDBACK_REQUESTED, 'PLCO_REVIEW_SCALE_DESCRIPTION'),
			labelText: meta4.widget.translate.getTranslate('_rate_activity')
		};	

		itemTypes.PLCO_DESCRIPTION = {
			labelOrientation : labelOrientation,
			nodeName : meta4.widget.TypeElement.comment, 
			showImage : false,                     
			classTdDiv: 'm4-input100', 
			placeHolder : meta4.widget.translate.getTranslate('_comment_tooltip'),
			labelText: ' ' 
		};	
		
 

		// Form
		options.itemTypes = itemTypes;

		var formReview = new meta4.widget.Form(t3PLCO_CP_FEEDBACK_REQUESTED, 'PLCO_CP_REQ_ACTIVITY_FEEDBACK', options);

 
		
		// Button Review
		var optionsReviewButton = {
			'id': 'btnReviewPaintForm',
			'typeButton' : 'primary',
			'm4autoTooltip' : false,
			'classButton': 'm4-minMarginRight',
			'events' : {
				'click' : function(){
					function successSave(){
						var retValue = parseInt(request.getResult());
						if (retValue !== -1) {
							meta4.data.showPopUpWrapData(meta4.widget.translate.getTranslate('_saveSuccess'));
							setTimeout(function () {
								if (meta4.M4Executor.isLocalExecution()){
									M4Anchor_Execute('UNLOAD', '[{"Key":"#SYS_FORCE_UNLOAD#","Value":"True"}]');
								} else {
									if (isBPO){
										// Estamos en un BPO: no navegamos a Mis tareas y deshabilitamos todo:
										formReview.getFormElement('PLCO_ORDER').readOnly(true);
										formReview.getFormElement('PLCO_DESCRIPTION').m4Disabled();
 
										reviewButton.m4Disabled();
										sendOk = true;										
									} else {
										goMyTask();	
									}									
								}								
							}, 1500);
						} else {
							meta4.data.log.addErrorMessage(meta4.widget.translate.getTranslate('_saveError'));
							meta4.widget.log.showErrors(meta4.data.log);
							return false;
						}
					}					
					var request = new meta4.M4Request(t3PLCO_CP_FEEDBACK_REQUESTED, "PLCO_CP_FEEDBACK_REQUESTED", 'PLCO_SAVE', null); 
					meta4.data.execute(request, successSave);
 
				}
			}
		};		
		var reviewButton = new meta4.widget.Button( meta4.widget.translate.getTranslate('_btn_feedback') ,'',optionsReviewButton);
		if(isMobile){
			divButtonsContainer.grab(reviewButton.container);
		}else{
			formReview.addButtons([reviewButton], true);
		}
		reviewButton.m4Disabled();

		// Button: No feedback
		var optionsNoFeedbackButton = {
			'id': 'btnNoFeedback',
			'typeButton' : 'secondary',
			'm4autoTooltip' : false,
			'classButton': 'm4-minMarginRight',
			'events' : {
				'click' : function(){
					function successSave(){
						var retValue = parseInt(request.getResult());
						if (retValue !== -1) {
							meta4.data.showPopUpWrapData(meta4.widget.translate.getTranslate('_save_no_feedback'));
							setTimeout(function () {
								if (meta4.M4Executor.isLocalExecution()){
									M4Anchor_Execute('UNLOAD', '[{"Key":"#SYS_FORCE_UNLOAD#","Value":"True"}]');
								} else {
									if (isBPO){
										// Estamos en un BPO: no navegamos a Mis tareas y deshabilitamos todo:
										formReview.getFormElement('PLCO_ORDER').readOnly(true);
										formReview.getFormElement('PLCO_DESCRIPTION').m4Disabled();
 
										reviewButton.m4Disabled();
										sendOk = true;										
									} else {
										goMyTask();	
									}									
								}								
							}, 1500);
						} else {
							meta4.data.log.addErrorMessage(meta4.widget.translate.getTranslate('_saveError'));
							meta4.widget.log.showErrors(meta4.data.log);
							return false;
						}
					}					
					var request = new meta4.M4Request(t3PLCO_CP_FEEDBACK_REQUESTED, "PLCO_CP_FEEDBACK_REQUESTED", 'PLCO_SAVE_NO_FEEDBACK', null);  
					meta4.data.execute(request, successSave);
 
				}
			}
		};		
		var noFeddbackButton = new meta4.widget.Button(meta4.widget.translate.getTranslate('_btn_no_feedback') ,'',optionsNoFeedbackButton);  
		if(isMobile){
			divButtonsContainer.grab(noFeddbackButton.container);
		}else{
			formReview.addButtons([noFeddbackButton]);
		}
 
		// Button Close			
		if (isBPO === false){
			var optionsCloseButton = {
				'id': 'btnClosePaintForm',
				'typeButton' : 'secondary',
				'm4autoTooltip' : false,
				'events' : {
					'click' : function(){
						if (meta4.M4Executor.isLocalExecution()){
							M4Anchor_Execute('UNLOAD', '[{"Key":"#SYS_FORCE_UNLOAD#","Value":"True"}]');
						} else {
							goMyTask();
						}										
					}
				}
			};		
			var closeButton = new meta4.widget.Button(meta4.widget.translate.getTranslate('_close'),'',optionsCloseButton); 
			if(isMobile){
				divButtonsContainer.grab(closeButton.container);
			}else{
				formReview.addButtons([closeButton]);
			}
		}

		// hasFormErrors
        formReview.addEvent('hasFormErrors', function (hasFormErrors) {
            if (hasFormErrors || sendOk) {
                reviewButton.m4Disabled();
            } else {
                reviewButton.m4Enabled();
            }
		});

		// Disable button Review
       	formReview.hasFormErrors(true); 

		// Container
		container.grab(formReview.getElement());
		
		//Alvaro - TEMPORAL hasta que se haga el estilo lightBackground de las multiselects en componente
		if ($('employeeList')){
			$('employeeList').setStyle('max-width','354px');
			$('employeeList').getElements('.m4-multiselect').setStyle('background','transparent');
			$('employeeList').getElements('.m4-multiselect').setStyle('border','0');
			$('employeeList').getElements('.m4-multiselect').setStyle('border-bottom','1px solid rgba(51, 51, 51, 0.2)');	
		}
	}


	function _paintPage() {
		$(document.head).getElement('title').set('text', meta4.widget.translate.getTranslate('_feedback'));

		createtitleBar();
		if (nodePLCO_CP_FEEDBACK_REQUESTED.count() === 0){
			// creamos el dom pero poniendo simplemente que no hay datos
			var container = $('containerTables');
			var divNoData = new Element('div', {
				'text' : meta4.widget.translate.getTranslate('_noData') 
			});
			container.grab(divNoData);
		}else{
			
			if(nodePLCO_CP_REQ_ACTIVITY_FEEDBACK.count() === 1){
				createHeader();
				// ya ha dado feedback para esta actividad
				var container = $('containerTables');
				var divNoData = new Element('div', {
					'text' : meta4.widget.translate.getTranslate('_feedback_done') 
				});
				container.grab(divNoData);
				
			} else {
				
				createHeader();
				createContent();
			}

		}


		$('main').setStyle('visibility', 'visible');
	}
	function _getWorkItemRich(){
		var parametersStrings = M4Anchor_Execute('', '');
		var listParameters = JSON.parse(parametersStrings);
		var getEntryValues = function (key, value) {
			if (value.Key === key)
				return true; 
			else
				return false;
		};
		var valueCall = listParameters.filter(getEntryValues.bind(this, "#SYS_IDWORKITEM#"));
		if (valueCall.length === 1) {
			_workItem = valueCall[0].Value;
			meta4.data.utils.setValue(nodePLCO_CP_FEEDBACK_REQUESTED,'PRP_ID_WORKITEM',_workItem);
		}		
	}

	function _getWorkItem(){
		var paramsUrl = window.location.href.split('?')[1];
		if (paramsUrl !== undefined) {
			var params = paramsUrl.split('&');
			if (params !== undefined) {
				var hash = null;
				for (var i = 0; i < params.length; i++)
				{
					hash = params[i].split('=');
					if (hash[0] === 'ID_WORKITEM') {
						_workItem = hash[1];
						_workItem = decodeURIComponent(_workItem);						
						
						meta4.data.utils.setValue(nodePLCO_CP_FEEDBACK_REQUESTED,'PRP_ID_WORKITEM',_workItem);
					}
				}
			}
		}
	}

	function _init() {
		try {
			if (window.parent.location.host.hashCode() === localStorage.getItem('m4Portal-domain')) {
				isBPO = false;
			}
		} catch(err) {
			isBPO = true;
		}	

		function onMetadataSuccess() {
			t3PLCO_CP_FEEDBACK_REQUESTED = new meta4.M4Object(PLCO_CP_FEEDBACK_REQUESTED, PLCO_CP_FEEDBACK_REQUESTED);
			nodePLCO_CP_FEEDBACK_REQUESTED = t3PLCO_CP_FEEDBACK_REQUESTED.getNode('PLCO_CP_FEEDBACK_REQUESTED');
			nodePLCO_CP_REQ_ACTIVITY_FEEDBACK = t3PLCO_CP_FEEDBACK_REQUESTED.getNode('PLCO_CP_REQ_ACTIVITY_FEEDBACK');
            if (meta4.M4Executor.isLocalExecution()) {
				_getWorkItemRich();
            } else {
				_getWorkItem();
			}

			if (_workItem === null){
				// creamos el dom pero poniendo simplemente que no hay datos
				var container = $('containerTables');
				var divNoData = new Element('div', {
					'text' : meta4.widget.translate.getTranslate('_noData') 
				});
				container.grab(divNoData);
				$('main').setStyle('visibility', 'visible');
			} else {
				var request = new meta4.M4Request(t3PLCO_CP_FEEDBACK_REQUESTED, 'PLCO_CP_FEEDBACK_REQUESTED', 'PLCO_LOAD_FEEDBACK', null);
				meta4.data.execute(request, _paintPage);
			}
		}
		meta4.data.loadMetadata([PLCO_CP_FEEDBACK_REQUESTED], onMetadataSuccess);
	}

	return {
		init : _init
	};
}());

if(isMobile){
	htmlContainer.addClass('isMobile');
}

document.addEvent('meta4Ready', meta4.review_and_recommend_course.init);
