'use strict';
var meta4 = meta4 || {};
meta4.pa = meta4.pa || {};
meta4.pa.employeeInformation = meta4.pa.employeeInformation || {};

meta4.pa.employeeInformation.Personal = function () {
    var _utils = null;
    var _tab = null;
    var _blockPerson = null;
    var _idTab = 'tabPersonal';
    var _idClass = 'Personal';
    /** @type meta4.exports.widget.Expander */
    var _expanderPerson = null;
    var _expanderBasicPerson = null;
    var _expanderOtherDataPerson = null;
    var _expanderNacionalityPerson = null;
    var _expanderAddressPerson = null;
    var _expanderContactPerson = null;
    var _expanderConnectionDataPerson = null;
    var _expanderEmailPerson = null;
    var _expanderPhoneFaxPerson = null;
    var _expanderOthContPerson = null;
    var _expanderBankPerson = null;
    var _expanderHrContactPerson = null;
    var _expanderCompInfPerson = null;
    var _expanderWebPerson = null;
    var _expanderOtherDocPerson = null;
    var _expanderDocsPerson = null;
    var _expanderFamilyPerson = null;
    var _expanderBuffInfo = null;
    /** @type meta4.exports.widget.Form */
    var _formPerson = null;
    var _formBirthNatioPerson = null;
    var _formOtherDataPerson = null;
    var _formOtherDataPersonMarital = null;
    var _formConnectionData = null;
    var _formNacionalityPerson = null;
    var _formOthContPerson = null;
    var _listObjToRefreshAfterPaint = [];
    var _listFormBankPerson = [];
    var _listFormHrContactPerson = [];
    var _formCompInfPerson = null;
    var _formWebPerson = null;
    var _listFormOtherDocPerson = [];
    //Separador
    var _separator = null;
    //Localizacion
    var _payrollItemParam = null;
    var _SHOW = true;
    var _HIDE = false;
    var _BPOInd = '';
    var _listSuffix = ['MX', 'CO', 'EC', 'CL', 'AR', 'PE', 'SV'];

    var mainPanel = null; //Se usa desde fuera
    var complementary = null;

    var _data = {
        t3Person: {
            id: 'PLCO_PA_MN_INF_PERSON',
            nodeConfigFields: {
                id: 'PLCO_FL_CONFIGURABLE_FIELDS'
            },
            nodePerson: {
                id: 'SRCO_PA_WZ_PERSON',
                type: 'main'
            },
            nodeNationality: {
                id: 'SRCO_PA_WZ_HR_NATIONALITY',
                dtStart: 'DT_START',
                dtEnd: 'DT_END'
            },
            nodeMaritalStats: {
                id: 'SRCO_PA_WZ_MAR_STATS',
                dtStart: 'STD_DT_START',
                dtEnd: 'STD_DT_END'
            },
            nodeAddress: {
                id: 'SRCO_PA_WZ_ADDRESS',
                dtStart: 'STD_DT_START',
                dtEnd: 'STD_DT_END'
            },
            nodeEmail: {
                id: 'SRCO_PA_WZ_EMAIL',
                dtStart: 'STD_DT_START',
                dtEnd: 'STD_DT_END'
            },
            nodePhoneFax: {
                id: 'SRCO_PA_WZ_PHONE_FAX',
                dtStart: 'STD_DT_START',
                dtEnd: 'STD_DT_END'
            },
            nodeOthCont: {
                id: 'SRCO_PA_WZ_OTH_CONT_F',
                dtStart: 'SCO_DT_START',
                dtEnd: 'SCO_DT_END'
            },
            nodeBank: {
                id: 'SRCO_PA_WZ_PERSON_BANK',
                dtStart: 'SCO_DT_START',
                dtEnd: 'SCO_DT_END'
            },
            nodeHrContact: {
                id: 'SRCO_PA_WZ_HR_CONTACT',
                dtStart: 'STD_DT_START',
                dtEnd: 'STD_DT_END'
            },
            nodeCompInf: {
                id: 'SRCO_PA_WZ_HR_COMP_INFORMATION'
            },
            nodeOtherDoc: {
                id: 'PLCO_PA_WZ_OTHER_DOCUMENTS',
                dtStart: 'DT_START',
                dtEnd: 'DT_END'
            },
            nodeHrType: {
                id: 'PLCO_PA_LU_HR_TYPE'
            }
        },
        t3Documents: {
            id: 'PLCO_MNG_DOC',
            referencedObject: ['t3ManageDocsPersonal'],
            nodeConfigFields: {
                id: 'PLCO_FL_CONFIGURABLE_FIELDS'
            },
            nodeDocs: {
                id: 'SCO_MT_HR_DOC',
                type: 'main'
            }
        },
        t3ManageDocsPersonal: {//Si solo se pasa el id del canal, solo se carga como amigo
            load: false,
            noAddedAsReference: true,
            id: 'SRTC_FL_DOCUMENT_MANAGEMENT',
            idAlias: 'DOCUMENT_MANAGEMENT_PLCO_MNG_D' //Este alias esta a fuego en el canal PLCO_MNG_DOC y PLCO_PA_EMPLOYEE_INFORMATION 
        },
        t3HrPeriod: {
            id: 'PLCO_PA_MN_HR_PERIOD',
            nodeConfigFields: {
                id: 'PLCO_FL_CONFIGURABLE_FIELDS'
            },
            nodeHrPeriod: {
                id: 'SRCO_PA_WZ_HR_PERIOD',
                type: 'main'
            },
            nodeFamily: {
                id: 'SRCO_PA_WZ_FAMILY',
                dtStart: 'STD_DT_START',
                dtEnd: 'STD_DT_END'
            },
            nodeClientBuffFields: {
                id: 'PLCO_ACTIVE_CLIENT_BUFF_FIELDS'
            },
            nodeLocalBuffFields: {
                id: 'PLCO_ACTIVE_LOCAL_BUFF_FIELDS'
            },
            nodeClientCompData: {
                id: 'PLCO_PA_WZ_C_COMPLEMENTARY_DAT'
            },
            nodeLocalCompData: {
                id: 'PLCO_PA_WZ_L_COMPLEMENTARY_DAT'
            }
        },
        t3ManageDocs: {
            load: false,
            id: 'SRTC_FL_DOCUMENT_MANAGEMENT'
        }
    };
    //var _expander = meta4.pa.employeeInformation.Data.getExpanders(_idTab);
    var _expander = getExpander();
    var _empModDef = {
        idClass: 'Personal',
        idTab: _idTab,
        STD_HT_MAR_STAT: {
            _channel: 't3Person',
            _node: 'nodeMaritalStats',
            _idExpander: _expander.OTHER_DATA,
            _idExpanderVisibleWithOutData: false,
            getElement: _getM4ListMaritalStatus
        },
        STD_FAMILY: {
            _channel: 't3HrPeriod',
            _node: 'nodeFamily',
            _idExpander: _expander.DEPENDENTS_PERSON,
            _idExpanderVisibleWithOutData: false,
            getForm: _getFormFamilyPerson
        },
        STD_HR_NATIONALITY: {
            _channel: 't3Person',
            _node: 'nodeNationality',
            _idExpander: _expander.BIRTH,
            _idExpanderVisibleWithOutData: false,
            getElement: _getM4ListNacionality
        },
        STD_ADDRESS: {
            _channel: 't3Person',
            _node: 'nodeAddress',
            _idExpander: _expander.ADDRESS,
            _idExpanderVisibleWithOutData: false,
            getForm: _getFormAddressPerson
        },
        STD_PHONE_FAX: {
            _channel: 't3Person',
            _node: 'nodePhoneFax',
            _idExpander: _expander.CONTACTS,
            _idExpanderVisibleWithOutData: false,
            getForm: _getFormContactTelFaxPerson
        },
        SCO_PERSON_BANK: {
            _channel: 't3Person',
            _node: 'nodeBank',
            _idExpander: _expander.BANK_DATA,
            _idExpanderVisibleWithOutData: false,
            getForm: _getFormBankPerson
        },
        SCO_HR_DOC: {
            _channel: 't3Documents',
            _node: 'nodeDocs',
            _idExpander: _expander.MANAGE_DOCUMENT,
            _idExpanderVisibleWithOutData: false,
            getForm: _getFormDocsPerson
        },
        STD_HR_CONTACT: {
            _channel: 't3Person',
            _node: 'nodeHrContact',
            _idExpander: _expander.HR_CONTACT_PERSON,
            _idExpanderVisibleWithOutData: false,
            getForm: _getFormHrContactPerson
        },
        PLCO_H_OTHER_DOCUMENTS: {
            _channel: 't3Person',
            _node: 'nodeOtherDoc',
            _idExpander: _expander.OTHER_DOCUMENTS_PERSON,
            _idExpanderVisibleWithOutData: false,
            getForm: _getFormOtherDocPerson
        },
        STD_EMAIL: {
            _channel: 't3Person',
            _node: 'nodeEmail',
            _idExpander: _expander.CONTACTS,
            _idExpanderVisibleWithOutData: false,
            getForm: _getFormContactEmailPerson
        },
        SCO_OTH_CONTACT_FORMS: {
            _channel: 't3Person',
            _node: 'nodeOthCont',
            _idExpander: _expander.OTH_CONT_F_PERSON,
            _idExpanderVisibleWithOutData: false,
            getForm: _getFormOthContPerson
        },
        STD_PERSON: {
            _channel: 't3Person',
            _node: 'nodePerson',
            _idExpander: _expander.PERSONAL_INFO,
            _idExpanderVisibleWithOutData: false,
            getForm: _getFormBasicPerson
        },
        PLCO_CLIENT_BUFFER_FIELDS: {
            _isBuffer: true,
            _isHistoric: false,
            _isLocal: false,
            _channel: 't3HrPeriod',
            _node: 'nodeClientCompData',
            _idExpander: _expander.ADDITIONAL_PERSONAL_DATA,
            _idExpanderVisibleWithOutData: false,
            getForm: _getBufferFormEmpMod //El que usa el asistente para crear el form
        },
        PLCO_LOCAL_BUFFER_FIELDS: {
            _isBuffer: true,
            _isHistoric: false,
            _isLocal: true,
            _channel: 't3HrPeriod',
            _node: 'nodeLocalCompData',
            _idExpander: _expander.ADDITIONAL_PERSONAL_DATA,
            _idExpanderVisibleWithOutData: false,
            getForm: _getBufferFormEmpMod //El que usa el asistente para crear el form
        }
    };

    /**
     * Oculta objetos del formulario antes del Run
     * @returns {} _executeHidden
     */
    function _executeHidden(obj) {
        var listObjs = [];

        if (typeOf(obj) === 'object') {
            listObjs.push(obj);
        } else if (typeOf(obj) === 'array') {
            listObjs = obj;
        }
        if (typeOf(listObjs) === 'array') {
            listObjs.forEach(function (obj) {
                if (_utils.notIsNullUndefined(obj)) {
                    obj.setHidden(true);
                }
            });
        }
    }

    /**
     * Habilitamos y deshabilitamos las validaciones de los objetos de un formulario
     * @returns {} _enableDisableValidationFields
     */
    function _enableDisableValidationFields(formPerson, listEnable, listDisable) {
        if (typeOf(listEnable) === 'array' && formPerson.inner !== undefined) {
            listEnable.forEach(function (idField) {
                formPerson.enableValidateItem(idField);
            });
        }
        if (typeOf(listDisable) === 'array' && formPerson.inner !== undefined) {
            listDisable.forEach(function (idField) {
                formPerson.disableValidateItem(idField);
            });
        }
    }

    /**
     * Muestra y oculta objetos de un formulario
     * @returns {} _executeHideShowField
     */
    //Ejecuta la funcion hideShowField
    function _executeHideShowField(formPerson, listShow, listHide, listShowColumnMultiple, listHideColumnMultiple) {
        if (typeOf(listHide) === 'array') {
            listHide.forEach(function (idField) {
                _utils.hideShowField(formPerson, idField, _HIDE);
            });
        }
        if (typeOf(listShow) === 'array') {
            listShow.forEach(function (idField) {
                _utils.hideShowField(formPerson, idField, _SHOW);
            });
        }
        if (typeOf(listHideColumnMultiple) === 'array') {
            if (_utils.notIsNullUndefined(formPerson.inner)) {
                listHideColumnMultiple.forEach(function (idField) {
                    formPerson.hideElement(idField);
                });
            }
        }
        if (typeOf(listShowColumnMultiple) === 'array') {
            if (_utils.notIsNullUndefined(formPerson.inner)) {
                listShowColumnMultiple.forEach(function (idField) {
                    formPerson.showElement(idField);
                });
            }
        }
    }
    /**
     * Crea listas con la etiqueta del nombre o del ID
     * @returns {meta4.exports.widget.m4ListJS} _getFormOtherDocPerson
     */
    function _getList(idItem, idItemOther, label, validValueFunction, propertiesItem) {
        //propertiesItem = {visible: 1, editable: 1};
        var m4List = null;
        if (idItemOther === undefined || idItemOther === null) {
            m4List = _utils.getM4ListJsFull(idItem, propertiesItem);
        } else {
            m4List = _utils.getM4ListJsFull(idItem, idItemOther, propertiesItem);
        }
        if (m4List !== null && label !== undefined && label !== null) {
            m4List.setLabelText(meta4.widget.translate.getTranslate(label));
        }
        if (m4List !== null && validValueFunction !== undefined && validValueFunction !== null) {
            m4List.setOnValidValue(validValueFunction);
        }
        return m4List;
    }
    /**
     * Crea formulario 
     * @returns {meta4.exports.widget.m4Form}
     */
    function _getFormToSection(idForm, idNode, node, channel) {
        var formTmp = _utils.getM4Form_Table(idForm);
        formTmp.setChannel(channel);
        formTmp.setNode(idNode);
        if (node !== undefined && node !== null) {
            formTmp.setCurrentIndex(node.getCurrent());
        }
        return formTmp;
    }

    /**
     * Crea el objeto fomulario que contendra los campos otros doc identificativos de la persona
     * @argument {Object} args - objeto con la informacion de las modificaciones del empleado 
     * @returns {meta4.exports.widget.Form} _getFormOtherDocPerson
     */
    function _getFormOtherDocPerson(args) {
        var nodeOtherDoc = null;
        //En funcion de si vamos por la ficha o por cambios guiados
        if (args.dataEmpMod) { //Usamos los datos del canal copy
            _utils.currentDataNode = args.dataEmpMod.t3Person.nodeOtherDoc.node;
            nodeOtherDoc = args.dataEmpMod.t3Person.nodeOtherDoc.node;
            _utils.objT3 = _utils.data.t3Person.t3;
        } else {
            _utils.currentDataNode = _utils.data.t3Person.nodeOtherDoc.node;
            nodeOtherDoc = _utils.data.t3Person.nodeOtherDoc.node;
        }

        var formOtherDocPerson = null;
        //Tipo documento
        function getListTypeDoc() {
            var listTypeDoc = _getList('SSP_ID_TP_DOC');
            if (_utils.notIsNullUndefined(listTypeDoc)) {
                listTypeDoc = _utils.setOptionsList(listTypeDoc, [{
                        'itemQBF': 'SSP_ID_TP_DOC',
                        'item': 'SSP_ID_TP_DOC'
                    }]);
                var addOtherItems = true;
                if (_utils.generalConfig.readOnly) {
                    var inputWitOutValue = meta4.data.utils.getValue(_utils.currentDataNode, 'SSP_ID_TP_DOC');
                    if (!_utils.notIsNullUndefined(inputWitOutValue) || inputWitOutValue.length === 0) {
                        addOtherItems = false;
                    }
                }
                if (addOtherItems) {
                    var otherItems = _utils.getOtherItems('SSP_ID_TP_DOC', {
                        dtStart: 'DT_START',
                        dtEnd: 'DT_END',
                        comment: null,
                        textDtStart: meta4.widget.translate.getTranslate('dtstart'),
                        textDtEnd: meta4.widget.translate.getTranslate('dtend')
                    }, formOtherDocPerson);
                    listTypeDoc.addOtherItems(otherItems);
                }
            }
            return listTypeDoc;
        }
        //Formulario
        formOtherDocPerson = _getFormToSection(args.idForm, nodeOtherDoc.getId(), nodeOtherDoc, nodeOtherDoc.getObject());

        var listTypeDoc = getListTypeDoc();
        formOtherDocPerson.addChild(listTypeDoc);

        var multiDataDocPerson = null;
        var gbLegal = _utils.getInput('PLCO_GB_LEGAL');
        if (listTypeDoc !== null || gbLegal !== null) {
            multiDataDocPerson = new meta4.exports.widget.MultipleItem();
            multiDataDocPerson.setId('PER_PLCO_GB_LEGAL');
            multiDataDocPerson.addChild(gbLegal);
        }
        formOtherDocPerson.addChild(multiDataDocPerson);

        var multiContryPlaceDocPerson = null;
        var listCountryDoc = _getList('STD_ID_COUNTRY');
        if (_utils.notIsNullUndefined(listCountryDoc)) {
            listCountryDoc = _utils.setOptionsList(listCountryDoc, [{
                    'itemQBF': 'STD_ID_COUNTRY',
                    'item': 'STD_ID_COUNTRY'
                }], 'PLCO_PA_WZ_OTHER_DOCUMENTS', 'STD_ID_COUNTRY');
        }
        var expPlace = _utils.getComment('PLCO_EXPEDITION_PLACE');
        if (listCountryDoc !== null || expPlace !== null) {
            multiContryPlaceDocPerson = new meta4.exports.widget.MultipleItem();
            multiContryPlaceDocPerson.setId('PER_STD_ID_COUNTRY_PLCO_EXPEDITION_PLACE');
            multiContryPlaceDocPerson.addChild(listCountryDoc);
            multiContryPlaceDocPerson.addChild(expPlace);
        }
        formOtherDocPerson.addChild(multiContryPlaceDocPerson);

        var multiDatesDocPerson = null;
        var dtExpedition = _utils.getCalendar('SCO_DT_EXPEDITION');
        var dtExpiry = _utils.getCalendar('PLCO_DT_EXPIRY');
        if (dtExpedition !== null || dtExpiry !== null) {
            multiDatesDocPerson = new meta4.exports.widget.MultipleItem();
            multiDatesDocPerson.setId('PER_SCO_DT_EXPEDITION_PLCO_DT_EXPIRY');
            multiDatesDocPerson.addChild(dtExpedition);
            multiDatesDocPerson.addChild(dtExpiry);
        }
        formOtherDocPerson.addChild(multiDatesDocPerson);

        var multiDataDescDocId = new meta4.exports.widget.MultipleItem();
        multiDataDescDocId.setId('PER_PLCO_DESCRIPTION_PLCO_DESCRIPTION2');
        multiDataDescDocId.addChild(_utils.getComment('PLCO_DESCRIPTION'));
        multiDataDescDocId.addChild(_utils.getComment('PLCO_DESCRIPTION2'));
        formOtherDocPerson.addChild(multiDataDescDocId);
        _listFormOtherDocPerson.push(formOtherDocPerson);
        formOtherDocPerson.setValidations(_utils.validationForms);
        _utils.validationForms = [];
        return formOtherDocPerson;
    }

    /**
     * Crea el objeto expander que contendra datos otros doc identificativos de la persona
     * @returns {meta4.exports.widget.Expander} _getExpandeOtherDocPerson
     */
    function _getExpandeOtherDocPerson() {
        /** @type meta4.exports.widget.Expander */
        _expanderOtherDocPerson = _utils.getExpanderVisible(_expander.OTHER_DOCUMENTS_PERSON, meta4.widget.translate.getTranslate('expotherdoc'), null, _tab.getId());
        if (_expanderOtherDocPerson) {
            var args = {
                expander: _expanderOtherDocPerson,
                id: 'formOtherDocPerson',
                idTable: 'PLCO_H_OTHER_DOCUMENTS',
                empModDef: _empModDef,
                prevFn: _getFormOtherDocPerson,
                that: this
            };
            _utils.paintEmpMod(args);
        }
        return _expanderOtherDocPerson;
    }

    /**
     * Crea el objeto fomulario que contendra los documentos de la person
     * @argument {Object} args - objeto con la informacion de las modificaciones del empleado
     * @returns {meta4.exports.widget.Form} _getFormDocsPerson
     */
    function _getFormDocsPerson(args) {
        _utils.nodeConfigFields = _utils.data.t3Documents.nodeConfigFields.node;

        var nodeDocs = null;
        var channelDoc = _utils.data.t3ManageDocsPersonal.t3;
        //En funcion de si vamos por la ficha o por cambios guiados
        if (args.dataEmpMod) { //Usamos los datos del canal copy
            _utils.currentDataNode = args.dataEmpMod.t3Documents.nodeDocs.node;
            nodeDocs = args.dataEmpMod.t3Documents.nodeDocs.node;
            _utils.objT3 = nodeDocs.getObject();
            channelDoc = args.dataEmpMod.t3ManageDocsPersonal.t3;
        } else {
            _utils.currentDataNode = _utils.data.t3Documents.nodeDocs.node;
            nodeDocs = _utils.data.t3Documents.nodeDocs.node;
            _utils.objT3 = nodeDocs.getObject();
        }
        var formDocsPerson = null;

        //Formulario
        formDocsPerson = _getFormToSection(args.idForm, nodeDocs.getId(), nodeDocs, nodeDocs.getObject());

        var multiTypeStateDocs = null;

        //Tipo documento de la persona
        var listTypeDoc = _getList('SCO_ID_DOC_TYPE');
        if (_utils.notIsNullUndefined(listTypeDoc)) {
            listTypeDoc = _utils.setOptionsList(listTypeDoc, [{
                    'itemQBF': 'SCO_ID_DOC_TYPE',
                    'item': 'SCO_ID_DOC_TYPE'
                }]);
        }
        formDocsPerson.addChild(listTypeDoc);

        var multiDatesDocs = null;
        //Fecha de emision
        var dtEmission = _utils.getCalendar('SCO_DT_EMISSION');
        //Valido hasta
        var dtValid = _utils.getCalendar('SCO_DT_VALID');
        if (dtEmission !== null || dtValid !== null) {
            multiDatesDocs = new meta4.exports.widget.MultipleItem();
            multiDatesDocs.setId('PER_SCO_DT_EMISSION_SCO_DT_VALID');
            multiDatesDocs.addChild(dtEmission);
            multiDatesDocs.addChild(dtValid);
        }
        formDocsPerson.addChild(multiDatesDocs);

        //Documento asociado
        function _getM4DocManage() {
            var m4DocManage = _utils.getDocmanage('SCO_ID_DOC', channelDoc);
            return m4DocManage;
        }
        formDocsPerson.addChild(_getM4DocManage());
        //Comentario del empleado
        formDocsPerson.addChild(_utils.getComment('SCO_COMMENT_EMP'));

        formDocsPerson.setValidations(_utils.validationForms);
        _utils.validationForms = [];
        return formDocsPerson;
    }

    /**
     * Crea el objeto expander que contendra datos documentos de la persona
     * @returns {meta4.exports.widget.Expander} _getExpanderDocsPerson
     */
    function _getExpanderDocsPerson() {
        /** @type meta4.exports.widget.Expander */
        _expanderDocsPerson = _utils.getExpanderVisible(_expander.MANAGE_DOCUMENT, meta4.widget.translate.getTranslate('expdocs'), null, _tab.getId());
        if (_expanderDocsPerson) {
            var args = {
                expander: _expanderDocsPerson,
                id: 'formDocsPerson',
                idTable: 'SCO_HR_DOC',
                empModDef: _empModDef,
                prevFn: _getFormDocsPerson,
                that: this
            };
            _utils.paintEmpMod(args);
        }
        return _expanderDocsPerson;
    }

    /**
     * Crea el objeto fomulario que contendra los dependientes de la persona
     * @argument {Object} args - objeto con la informacion de las modificaciones del empleado
     * @returns {meta4.exports.widget.Form} _getFormFamilyPerson
     */
    function _getFormFamilyPerson(args) {
        var formFamilyPerson = null;
        var selectCalcIrpf = null;
        var selectCompFull = null;
        var selectStudent = null;
        var selectHandicap = null;
        var listTypeDep = null;
        var listDepMinus = null;
        var selectIrpfAd = null;
        var multiDateDep_DIV = null;
        var dateAdop = null;
        var dateEndTut = null;
        var multiDataCompIrpfDep = null;

        _utils.nodeConfigFields = _utils.data.t3HrPeriod.nodeConfigFields.node;

        var nodeFamily = null;
        //En funcion de si vamos por la ficha o por cambios guiados
        if (args.dataEmpMod) { //Usamos los datos del canal copy
            _utils.currentDataNode = args.dataEmpMod.t3HrPeriod.nodeFamily.node;
            nodeFamily = args.dataEmpMod.t3HrPeriod.nodeFamily.node;
            _utils.objT3 = _utils.data.t3HrPeriod.t3;
        } else {
            _utils.currentDataNode = _utils.data.t3HrPeriod.nodeFamily.node;
            nodeFamily = _utils.data.t3HrPeriod.nodeFamily.node;
            _utils.objT3 = nodeFamily.getObject();
        }

        //Formulario
        formFamilyPerson = _getFormToSection(args.idForm, nodeFamily.getId(), nodeFamily, nodeFamily.getObject());

        //Dependiente
        if (args.idAction === _utils.ADD) {
            var multiDataSurPersonDep = null;
            var nameDep = _utils.getInput('STD_N_FIRST_NAME', {
                visible: 1,
                editable: 1,
                nameField: _utils.currentDataNode.getItemMetadata('STD_N_FIRST_NAME').getProperty('Name')
            });
            var firstName = _utils.getInput('STD_N_FAMILY_NAME_1', {
                visible: 1,
                editable: 1,
                nameField: _utils.currentDataNode.getItemMetadata('STD_N_FAMILY_NAME_1').getProperty('Name')
            });
            var secondName = _utils.getInput('PLCO_SURNAME_2', {
                visible: 1,
                editable: 1,
                nameField: _utils.currentDataNode.getItemMetadata('STD_N_FAMILY_NAME_1').getProperty('Name')
            });
            if (nameDep !== null || firstName !== null || secondName !== null) {
                multiDataSurPersonDep = new meta4.exports.widget.MultipleItem();
                multiDataSurPersonDep.addChild(nameDep);
                multiDataSurPersonDep.addChild(firstName);
                multiDataSurPersonDep.addChild(secondName);
            }
            formFamilyPerson.addChild(multiDataSurPersonDep);

            var multiDataNamesFamMPersonDep = new meta4.exports.widget.MultipleItem();
            multiDataNamesFamMPersonDep.setId('DEP_STD_N_USUAL_NAME_SUK_OTHER_FORENAMES_STD_N_MAIDEN_NAME');
            //Otro nombre
            multiDataNamesFamMPersonDep.addChild(_utils.getInput('SUK_OTHER_FORENAMES'));
            //Nombre familiar
            multiDataNamesFamMPersonDep.addChild(_utils.getInput('STD_N_USUAL_NAME'));
            //Apellido de soltera
            multiDataNamesFamMPersonDep.addChild(_utils.getInput('STD_N_MAIDEN_NAME'));
            formFamilyPerson.addChild(multiDataNamesFamMPersonDep);

            //Nombre alfabeto nativo
            formFamilyPerson.addChild(_utils.getInput('PLCO_GB_NAME_UNICODE'));

        } else {
            //Nombre / Primer apellido            
            var multiDataSurPersonDep = new meta4.exports.widget.MultipleItem();

            multiDataSurPersonDep.setId('DEP_STD_N_FAMILY_NAME_1_PLCO_SURNAME_2_STD_N_FIRST_NAME');
            //Nombre
            multiDataSurPersonDep.addChild(_utils.getInput('STD_N_FIRST_NAME'));
            //Primer apellido
            multiDataSurPersonDep.addChild(_utils.getInput('STD_N_FAMILY_NAME_1'));
            //Segundo apellido
            multiDataSurPersonDep.addChild(_utils.getInput('PLCO_SURNAME_2'));
            formFamilyPerson.addChild(multiDataSurPersonDep);

            var multiDataNamesFamMPersonDep = new meta4.exports.widget.MultipleItem();
            multiDataNamesFamMPersonDep.setId('DEP_STD_N_USUAL_NAME_SUK_OTHER_FORENAMES_STD_N_MAIDEN_NAME');
            //Otro nombre
            multiDataNamesFamMPersonDep.addChild(_utils.getInput('SUK_OTHER_FORENAMES'));
            //Nombre familiar
            multiDataNamesFamMPersonDep.addChild(_utils.getInput('STD_N_USUAL_NAME'));
            //Apellido de soltera
            multiDataNamesFamMPersonDep.addChild(_utils.getInput('STD_N_MAIDEN_NAME'));
            formFamilyPerson.addChild(multiDataNamesFamMPersonDep);

            //Nombre alfabeto nativo
            formFamilyPerson.addChild(_utils.getInput('PLCO_GB_NAME_UNICODE'));

        }

        //Sexo
        var listGenderDep = _getList('STD_ID_GENDER');
        if (_utils.notIsNullUndefined(listGenderDep)) {
            //listGenderDep = _utils.setOptionsList(listGenderDep, [{'itemQBF': 'STD_ID_GENDER', 'item': 'STD_ID_GENDER'}]);
        }
        formFamilyPerson.addChild(listGenderDep);
        //Fecha de nacimiento
        var dateBornDep = _utils.getCalendar('STD_DT_BIRTH');
        formFamilyPerson.addChild(dateBornDep);

        //Control del motivo de fin
        var listTypeEndReasonDep = null;
        var eventEndReasonDep = function () {
            var valueDtEnd = meta4.data.utils.getValue(nodeFamily, 'STD_DT_END');
            var endReasObj = formFamilyPerson.getFormElement('PLCO_ID_END_REASON_DEP');
            if (endReasObj && _utils.notIsNullUndefined(valueDtEnd) && valueDtEnd.length > 0) {
                endReasObj.m4Enabled();
            } else {
                meta4.data.utils.setValue(nodeFamily, 'PLCO_ID_END_REASON_DEP', null);
                if (endReasObj) {
                    endReasObj.m4Disabled();
                }
            }
        };

        //Tipo dependiente
        function getListTypeDep() {
            listTypeDep = _getList('STD_ID_DEP_TYPE');
            if (_utils.notIsNullUndefined(listTypeDep)) {
                var addOtherItems = true;
                if (_utils.generalConfig.readOnly) {
                    var inputWitOutValue = meta4.data.utils.getValue(_utils.currentDataNode, 'STD_ID_DEP_TYPE');
                    if (!_utils.notIsNullUndefined(inputWitOutValue) || inputWitOutValue.length === 0) {
                        addOtherItems = false;
                    }
                }
                if (addOtherItems) {
                    var otherItems = _utils.getOtherItems('STD_ID_DEP_TYPE', {
                        comment: null,
                        eventEndReasonDep: eventEndReasonDep
                    }, formFamilyPerson);
                    listTypeDep.addOtherItems(otherItems);
                }

                if (args.dataEmpMod) { //Usamos los datos del canal copy
                    args.eventEndReasonDep = eventEndReasonDep;
                }
            }
            return listTypeDep;
        }
        formFamilyPerson.addChild(getListTypeDep());

        //Tipo Certificación Vínculo
        var listTypeCertDep = _getList('PLCO_ID_TYPE_CERT_DEP');
        if (_utils.notIsNullUndefined(listTypeCertDep)) {
            listTypeCertDep = _utils.setOptionsList(listTypeCertDep, [{
                    'itemQBF': 'PLCO_ID_TYPE_CERT_DEP',
                    'item': 'PLCO_ID_TYPE_CERT_DEP'
                }]);
        }
        formFamilyPerson.addChild(listTypeCertDep);
        //Detalle Certificación Vínculo
        var certDetailDep = _utils.getComment('PLCO_DEPENDENT_CERT_DETAIL');
        formFamilyPerson.addChild(certDetailDep);

        var eventChangeDep = function (form, valueIrpfA, valueHandicap) {
            if (valueIrpfA) {
                if (valueIrpfA === '0') {
                    form.disableElement('SSP_IRPF_FECHA_ADOPCION');
                    form.disableElement('PLCO_DT_END_TUT_LEG');
                } else {
                    form.enableElement('SSP_IRPF_FECHA_ADOPCION');
                    form.enableElement('PLCO_DT_END_TUT_LEG');
                }
            }
            if (valueHandicap) {
                if (valueHandicap === '0') {
                    form.disableElement('SSP_ID_MINUSVALIA');
                } else {
                    form.enableElement('SSP_ID_MINUSVALIA');
                }
            }
        };

        //Tutela legal
        var selectOptionsIrpfAd = meta4.ss.widget.ObjectLibrary.getSelect('SELECT_YES_NO');
        selectIrpfAd = _utils.getSelect('SSP_IRPF_ADOPTADO', null, null, selectOptionsIrpfAd);
        if (_utils.notIsNullUndefined(selectIrpfAd)) {
            selectIrpfAd.setItemToVisualBinding(false);
            var changeIrpfAd = function (form, value) {
                eventChangeDep(form, value);
            }.bind(this, formFamilyPerson);
            selectIrpfAd.setEventsSelected(changeIrpfAd);
        }

        //Fecha inicio tutela
        dateAdop = _utils.getCalendar('SSP_IRPF_FECHA_ADOPCION');
        //Fecha fin tutela
        dateEndTut = _utils.getCalendar('PLCO_DT_END_TUT_LEG');
        if (selectIrpfAd !== null || dateAdop !== null || dateEndTut !== null) {
            multiDateDep_DIV = new meta4.exports.widget.MultipleItem();
            multiDateDep_DIV.setId('PER_SSP_IRPF_ADOPTADO_SSP_IRPF_FECHA_ADOPCION_PLCO_DT_END_TUT_LEG');
            //multiDateDep_DIV.setId('SSP_IRPF_FECHA_ADOPCION');
            multiDateDep_DIV.addChild(selectIrpfAd);
            multiDateDep_DIV.addChild(dateAdop);
            multiDateDep_DIV.addChild(dateEndTut);
        }
        formFamilyPerson.addChild(multiDateDep_DIV);
        var valueIrpfAdop = meta4.data.utils.getValue(nodeFamily, 'SSP_IRPF_ADOPTADO');
        if (valueIrpfAdop === 0) {
            //dateAdop.setDisabled();  //****  DE MOMENTO NO SE PUEDE HACER POQUE NO FUNCIONA IGUAL setDisabled QUE disableElement.
            //dateEndTut.setDisabled();  //****  DE MOMENTO NO SE PUEDE HACER POQUE NO FUNCIONA IGUAL setDisabled QUE disableElement.
        }

        multiDataCompIrpfDep = new meta4.exports.widget.MultipleItem();
        multiDataCompIrpfDep.setId('PER_SSP_CALC_IRPF_COMPUTO_ENTERO');
        //Afecta legalmente al empleado
        var selectOptionsCalcIrpf = meta4.ss.widget.ObjectLibrary.getSelect('SELECT_YES_NO');
        selectCalcIrpf = _utils.getSelect('SSP_CALC_IRPF', null, null, selectOptionsCalcIrpf);
        multiDataCompIrpfDep.addChild(selectCalcIrpf);
        //Computo por entero
        var selectOptionsCompFull = meta4.ss.widget.ObjectLibrary.getSelect('SELECT_YES_NO');
        selectCompFull = _utils.getSelect('SSP_COMPUTO_ENTERO', null, null, selectOptionsCompFull);
        if (_utils.notIsNullUndefined(selectCompFull)) {
            selectCompFull.setItemToVisualBinding(false);
        }
        multiDataCompIrpfDep.addChild(selectCompFull);
        formFamilyPerson.addChild(multiDataCompIrpfDep);

        var multiHandicapMinusFamily = null;
        //Discapacitado
        var selectOptionsHandicap = meta4.ss.widget.ObjectLibrary.getSelect('SELECT_YES_NO');
        selectHandicap = _utils.getSelect('STD_HANDICAP', null, null, selectOptionsHandicap);
        if (_utils.notIsNullUndefined(selectHandicap)) {
            var changeHandicap = function (form, value) {
                eventChangeDep(form, null, value);
            }.bind(this, formFamilyPerson);
            selectHandicap.setEventsSelected(changeHandicap);
        }
        //Grado minusvalia
        listDepMinus = _getList('SSP_ID_MINUSVALIA');
        if (_utils.notIsNullUndefined(listDepMinus)) {
            listDepMinus = _utils.setOptionsList(listDepMinus, [{
                    'itemQBF': 'SSP_ID_MINUSVALIA',
                    'item': 'SSP_ID_MINUSVALIA'
                }]);
            var valueMinus = meta4.data.utils.getValue(nodeFamily, 'STD_HANDICAP');
            if (valueIrpfAdop === 0) {
                //listDepMinus.setDisabled();  //****  DE MOMENTO NO SE PUEDE HACER POQUE NO FUNCIONA IGUAL setDisabled QUE disableElement.
            }
        }
        if (selectHandicap !== null || listDepMinus !== null) {
            multiHandicapMinusFamily = new meta4.exports.widget.MultipleItem();
            multiHandicapMinusFamily.setId('PER_STD_HANDICAP_SSP_ID_MINUSVALIA');
            multiHandicapMinusFamily.addChild(selectHandicap);
            multiHandicapMinusFamily.addChild(listDepMinus);
        }
        formFamilyPerson.addChild(multiHandicapMinusFamily);

        //Estudia tiempo completo
        var selectOptionsStudent = meta4.ss.widget.ObjectLibrary.getSelect('SELECT_YES_NO');
        selectStudent = _utils.getSelect('SCO_STUDENT', null, null, selectOptionsStudent);
        if (_utils.notIsNullUndefined(selectStudent)) {
            selectStudent.setItemToVisualBinding(false);
        }
        formFamilyPerson.addChild(selectStudent);
        //Numero de descendientes
        var cDescendientes = _utils.getInput('SSP_CONV_DESCENDIENTES');
        if (cDescendientes) {
            cDescendientes.setClassWidth('m4-input100');
        }
        formFamilyPerson.addChild(cDescendientes);
        //Tipo de documento        
        function getListTypeDoc() {
            var listTypeDoc = _getList('SSP_ID_TP_DOC');
            if (_utils.notIsNullUndefined(listTypeDoc)) {
                listTypeDoc = _utils.setOptionsList(listTypeDoc, [{
                        'itemQBF': 'SSP_ID_TP_DOC',
                        'item': 'SSP_ID_TP_DOC'
                    }]);
            }
            return listTypeDoc;
        }
        formFamilyPerson.addChild(getListTypeDoc());
        //Numero identificativo
        formFamilyPerson.addChild(_utils.getInput('SCO_GB_LEGAL'));
        //Fecha de Expedicion
        formFamilyPerson.addChild(_utils.getCalendar('SCO_DT_EXPEDITION'));
        //Lugar de Expedicion
        formFamilyPerson.addChild(_utils.getComment('SCO_EXPEDITION_PLACE'));
        //Fecha de Expiracion
        formFamilyPerson.addChild(_utils.getCalendar('PLCO_DT_EXPIRATION'));

        //Motivo de Fin 
        listTypeEndReasonDep = _getList('PLCO_ID_END_REASON_DEP');
        if (_utils.notIsNullUndefined(listTypeEndReasonDep)) {
            listTypeEndReasonDep = _utils.setOptionsList(listTypeEndReasonDep, [{
                    'itemQBF': 'PLCO_ID_END_REASON_DEP',
                    'item': 'PLCO_ID_END_REASON_DEP'
                }]);
        }
        formFamilyPerson.addChild(listTypeEndReasonDep);

        var formDrawCompleteDep = function (form) {
            var itemValues = meta4.data.utils.getValues(nodeFamily, ['SSP_IRPF_ADOPTADO', 'STD_HANDICAP'], null);
            //En los m4select bindados no salta el evento setEventsSelected (change) cuando pintamos 1 vez el dato
            //Solo salta cuando seleccionamos manualmente el m4select. 
            //Aun así, saltando puede que los objeto sobre los que queremos interactuar no esten creados o listos
            setTimeout(function () {
                eventChangeDep(form, itemValues[0].toString(), itemValues[1].toString());
                eventEndReasonDep();
            }, 300);
        }.bind(this, formFamilyPerson);
        formFamilyPerson.setOnFormDrawComplete(formDrawCompleteDep);
        formFamilyPerson.setValidations(_utils.validationForms);
        _utils.validationForms = [];
        return formFamilyPerson;
    }

    /**
     * Crea el objeto expander que contendra datos dependientes de la persona
     * @returns {meta4.exports.widget.Expander} _getExpanderFamilyPerson
     */
    function _getExpanderFamilyPerson() {
        /** @type meta4.exports.widget.Expander */
        _expanderFamilyPerson = _utils.getExpanderVisible(_expander.DEPENDENTS_PERSON, meta4.widget.translate.getTranslate('expdep'), null, _tab.getId());
        if (_expanderFamilyPerson) {
            var args = {
                expander: _expanderFamilyPerson,
                id: 'formFamilyPerson',
                idTable: 'STD_FAMILY',
                empModDef: _empModDef,
                prevFn: _getFormFamilyPerson,
                that: this
            };
            _utils.paintEmpMod(args);
        }
        return _expanderFamilyPerson;
    }

    /**
     * Crea el objeto fomulario que contendra los campos informacion complementaria de la persona
     * @returns {meta4.exports.widget.Form} _getFormCompInfPerson
     */
    function _getFormCompInfPerson() {
        _formCompInfPerson = _utils.getM4Form_Table('formCompInfPerson');
        _formCompInfPerson.setChannel(_utils.data.t3Person.t3);
        _formCompInfPerson.setNode(_utils.data.t3Person.nodeCompInf.id);
        _formCompInfPerson.setValidations(_utils.validationForms);
        _utils.validationForms = [];
        //**** FALTAN LOS TODOS LOS CAMPOS DE LA SECCION ****

        //**** FALTAN LOS TODOS LOS CAMPOS DE LA SECCION ****
        return _formCompInfPerson;
    }

    /**
     * Crea el objeto expander que contendra datos informacion complementaria de la persona
     * @returns {meta4.exports.widget.Expander} _getExpandeCompInfPerson
     */
    function _getExpandeCompInfPerson() {
        /** @type meta4.exports.widget.Expander */
        _utils.currentDataNode = _utils.data.t3Person.nodeCompInf.node;
        _expanderCompInfPerson = _utils.getExpander('expanderCompInfPerson', meta4.widget.translate.getTranslate('expocompinf'), null, _tab.getId());
        _expanderCompInfPerson.addChild(_getFormCompInfPerson());
        return _expanderCompInfPerson;
    }

    /**
     * Crea el objeto fomulario que contendra los campos informacion complementaria de la persona
     * @returns {meta4.exports.widget.Form} _getFormCompInfPerson
     */
    function _getFormWebPerson() {
        _formWebPerson = _getFormToSection('formWebPerson', _utils.data.t3Person.nodePerson.id, _utils.data.t3Person.nodePerson.node, _utils.data.t3Person.t3);
        _formWebPerson.addChild(_utils.getInput('SCO_HOME_PAGE'));
        _formWebPerson.setValidations(_utils.validationForms);
        _utils.validationForms = [];
        return _formWebPerson;
    }

    /**
     * Crea el objeto expander que contendra datos sobre web profesional de la persona
     * @returns {meta4.exports.widget.Expander} _getExpandePersonalWeb
     */
    function _getExpandePersonalWeb() {
        /** @type meta4.exports.widget.Expander */
        _utils.currentDataNode = _utils.data.t3Person.nodePerson.node;
        _expanderWebPerson = _utils.getExpander(_expander.PERSONAL_INFO, meta4.widget.translate.getTranslate('proweb'), true, null, _tab.getId());
        _expanderWebPerson.addChild(_getFormWebPerson());
        return _expanderWebPerson;
    }

    /**
     * Crea el objeto fomulario que contendra los campos contactos de emergencia de la persona
     * @argument {Object} args - objeto con la informacion de las modificaciones del empleado
     * @returns {meta4.exports.widget.Form} _getFormHrContactPerson
     */
    function _getFormHrContactPerson(args) {
        var formHrContactPerson = null;
        var listTypeDep = null;
        var listTypeLine = null;
        var intCountryCode1 = null;
        var intRegionCode1 = null;
        var natRegionCode1 = null;
        var phone1 = null;
        var multiDataContactPerson1 = null;
        var listTypeLine2 = null;
        var intCountryCode2 = null;
        var intRegionCode2 = null;
        var natRegionCode2 = null;
        var phone2 = null;
        var multiDataContactPerson2 = null;
        var multiDataEmailPerson = null;
        var multiDataInitPerson = null;
        var listLocationTypeHrContact = null;
        var listCountryAddressHrContact = null;
        var listGeoDivAddressHrContact = null;
        var multiGEO_DIV = null;
        var nGeoDiv = null;
        var listSubGeoDivAddressHrContact = null;
        var nSubGeoDiv = null;
        var multiSUB_GEO_DIV = null;
        var listGeoPlaceAddressHrContact = null;
        var selectMainContact = null;


        var nodeHrContact = null;
        //En funcion de si vamos por la ficha o por cambios guiados
        if (args.dataEmpMod) { //Usamos los datos del canal copy
            _utils.currentDataNode = args.dataEmpMod.t3Person.nodeHrContact.node;
            nodeHrContact = args.dataEmpMod.t3Person.nodeHrContact.node;
            _utils.objT3 = _utils.data.t3Person.t3;
        } else {
            _utils.currentDataNode = _utils.data.t3Person.nodeHrContact.node;
            nodeHrContact = _utils.data.t3Person.nodeHrContact.node;
        }

        //Nombre contacto
        function getInputNContact() {
            var inputNContact = _utils.getInput('STD_N_CONTACT');
            if (_utils.notIsNullUndefined(inputNContact)) {
                var addOtherItems = true;
                if (_utils.generalConfig.readOnly) {
                    var inputWitOutValue = meta4.data.utils.getValue(_utils.currentDataNode, 'STD_N_CONTACT');
                    if (!_utils.notIsNullUndefined(inputWitOutValue) || inputWitOutValue.length === 0) {
                        addOtherItems = false;
                    }
                }
                if (addOtherItems) {
                    var otherItems = _utils.getOtherItems('STD_N_CONTACT', {
                        comment: null,
                        deleteWhenFlatten: 'dates'
                    }, formHrContactPerson);
                    inputNContact.addOtherItems(otherItems);
                }
            }
            return inputNContact;
        }

        formHrContactPerson = _getFormToSection(args.idForm, nodeHrContact.getId(), nodeHrContact, nodeHrContact.getObject());
        //Nombre contacto
        formHrContactPerson.addChild(getInputNContact());

        multiDataInitPerson = new meta4.exports.widget.MultipleItem();
        multiDataInitPerson.setId('PER_STD_MAIN_CONTACT_STD_ID_DEP_TYPE_SCO_ICE');
        //Contacto principal
        var selectOptionsMainContact = meta4.ss.widget.ObjectLibrary.getSelect('SELECT_YES_NO');
        selectMainContact = _utils.getSelect('STD_MAIN_CONTACT', null, null, selectOptionsMainContact);
        multiDataInitPerson.addChild(selectMainContact);
        //Tipo de dependencia
        listTypeDep = _getList('STD_ID_DEP_TYPE');
        if (_utils.notIsNullUndefined(listTypeDep)) {
            listTypeDep = _utils.setOptionsList(listTypeDep, [{
                    'itemQBF': 'STD_ID_DEP_TYPE',
                    'item': 'STD_ID_DEP_TYPE'
                }]);
        }
        multiDataInitPerson.addChild(listTypeDep);
        //Prooridad del ICE
        var iceData = _utils.getInput('SCO_ICE');
        if (_utils.notIsNullUndefined(iceData)) {
            iceData.setClassWidth('m4-input5');
        }
        multiDataInitPerson.addChild(iceData);
        formHrContactPerson.addChild(multiDataInitPerson);

        //Tipo de linea 1      
        listTypeLine = _getList('STD_ID_LINE_TYPE');
        if (_utils.notIsNullUndefined(listTypeLine)) {
            listTypeLine = _utils.setOptionsList(listTypeLine, [{
                    'itemQBF': 'STD_ID_LINE_TYPE',
                    'item': 'STD_ID_LINE_TYPE'
                }], 'SRCO_PA_WZ_HR_CONTACT', 'STD_ID_LINE_TYPE');
        }
        //formHrContactPerson.addChild(listTypeLine);
        //Prefijo pais 1
        intCountryCode1 = _utils.getInput('STD_INT_COUNTRY_CODE_1');
        if (_utils.notIsNullUndefined(intCountryCode1)) {
            intCountryCode1.setClassWidth('m4-input10');
        }
        //formHrContactPerson.addChild(intCountryCode1);
        //Prefijo provincia int 1
        intRegionCode1 = _utils.getInput('STD_INT_REGION_CODE_1');
        if (_utils.notIsNullUndefined(intRegionCode1)) {
            intRegionCode1.setClassWidth('m4-input10');
        }
        //formHrContactPerson.addChild(intRegionCode1);
        //Prefijo provincia nac 1
        natRegionCode1 = _utils.getInput('STD_NAT_REGION_CODE_1');
        if (_utils.notIsNullUndefined(natRegionCode1)) {
            natRegionCode1.setClassWidth('m4-input10');
        }
        //formHrContactPerson.addChild(natRegionCode1);
        //Telefono 1
        phone1 = _utils.getInput('STD_PHONE_NUMBER_1');
        //formHrContactPerson.addChild(phone1);
        if (intCountryCode1 !== null || intRegionCode1 !== null || natRegionCode1 !== null || phone1 !== null) {
            multiDataContactPerson1 = new meta4.exports.widget.MultipleItem();
            multiDataContactPerson1.setId('PER_STD_ID_LINE_TYPE_STD_INT_COUNTRY_CODE_1_STD_INT_REGION_CODE_1_STD_NAT_REGION_CODE_1_STD_PHONE_NUMBER_1');
            multiDataContactPerson1.addChild(listTypeLine);
            multiDataContactPerson1.addChild(intCountryCode1);
            multiDataContactPerson1.addChild(intRegionCode1);
            multiDataContactPerson1.addChild(natRegionCode1);
            multiDataContactPerson1.addChild(phone1);
        }
        formHrContactPerson.addChild(multiDataContactPerson1);

        //Tipo de linea 2      
        listTypeLine2 = _getList('STD_ID_LINE_TYPE', 'STD_ID_LINE_TYPE_2');
        if (_utils.notIsNullUndefined(listTypeLine2)) {
            listTypeLine2 = _utils.setOptionsList(listTypeLine2, [{
                    'itemQBF': 'STD_ID_LINE_TYPE',
                    'item': 'STD_ID_LINE_TYPE_2'
                }], 'SRCO_PA_WZ_HR_CONTACT', 'STD_ID_LINE_TYPE_2');
        }
        //formHrContactPerson.addChild(listTypeLine2);
        //Prefijo pais 2
        intCountryCode2 = _utils.getInput('STD_INT_COUNTRY_CODE_2');
        if (_utils.notIsNullUndefined(intCountryCode2)) {
            intCountryCode2.setClassWidth('m4-input10');
        }
        //formHrContactPerson.addChild(intCountryCode2);
        //Prefijo provincia int 1
        intRegionCode2 = _utils.getInput('STD_INT_REGION_CODE_2');
        if (_utils.notIsNullUndefined(intRegionCode2)) {
            intRegionCode2.setClassWidth('m4-input10');
        }
        //formHrContactPerson.addChild(intRegionCode2);
        //Prefijo provincia nac 1
        natRegionCode2 = _utils.getInput('STD_NAT_REGION_CODE_2');
        if (_utils.notIsNullUndefined(natRegionCode2)) {
            natRegionCode2.setClassWidth('m4-input10');
        }
        //formHrContactPerson.addChild(natRegionCode2);
        //Telefono 2
        phone2 = _utils.getInput('STD_PHONE_NUMBER_2');
        //formHrContactPerson.addChild(phone2);
        if (intCountryCode2 !== null || intRegionCode2 !== null || natRegionCode2 !== null || phone2 !== null) {
            multiDataContactPerson2 = new meta4.exports.widget.MultipleItem();
            multiDataContactPerson2.setId('PER_STD_ID_LINE_TYPE_2_STD_INT_COUNTRY_CODE_2_STD_INT_REGION_CODE_2_STD_NAT_REGION_CODE_2_STD_PHONE_NUMBER_2');
            multiDataContactPerson2.addChild(listTypeLine2);
            multiDataContactPerson2.addChild(intCountryCode2);
            multiDataContactPerson2.addChild(intRegionCode2);
            multiDataContactPerson2.addChild(natRegionCode2);
            multiDataContactPerson2.addChild(phone2);
        }
        formHrContactPerson.addChild(multiDataContactPerson2);

        multiDataEmailPerson = new meta4.exports.widget.MultipleItem();
        multiDataEmailPerson.setId('PER_PLCO_EMAIL_1_EMAIL_2');
        //Correo 1
        multiDataEmailPerson.addChild(_utils.getInput('PLCO_EMAIL_1'));
        //Correo 2
        multiDataEmailPerson.addChild(_utils.getInput('PLCO_EMAIL_2'));
        formHrContactPerson.addChild(multiDataEmailPerson);

        //Tipo de lugar
        listLocationTypeHrContact = _getList('STD_ID_LOCATION_TYPE');
        if (_utils.notIsNullUndefined(listLocationTypeHrContact)) {
            listLocationTypeHrContact = _utils.setOptionsList(listLocationTypeHrContact, [{
                    'itemQBF': 'STD_ID_LOCATION_TYPE',
                    'item': 'STD_ID_LOCATION_TYPE'
                }], 'SRCO_PA_WZ_HR_CONTACT', 'STD_ID_LOCATION_TYPE');
        }
        formHrContactPerson.addChild(listLocationTypeHrContact);
        //Direccion
        //Pais
        var countrySelectedOld = null;
        listCountryAddressHrContact = _getList('STD_ID_COUNTRY');
        if (_utils.notIsNullUndefined(listCountryAddressHrContact)) {
            var elementsToEnabledDisabledCountry = ['STD_ID_GEO_DIV', 'STD_ID_SUB_GEO_DIV', 'PLCO_NM_TOWN', 'PLCO_NM_GEO_DIV', 'SUK_ZIP_CODE', 'SUK_ADDRESS_LINE_1', 'SUK_ADDRESS_LINE_2', 'SUK_ADDRESS_LINE_3', 'SUK_ADDRESS_LINE_4'];
            var elementsToEmptyCountry = ['PLCO_NM_TOWN', 'PLCO_NM_GEO_DIV', 'SUK_ZIP_CODE', 'SUK_ADDRESS_LINE_1', 'SUK_ADDRESS_LINE_2', 'SUK_ADDRESS_LINE_3', 'SUK_ADDRESS_LINE_4'];
            var elementsToChangeCountry = ['STD_ID_SUB_GEO_DIV'];
            var elementsToEnabledDisabledSubGeoToChangeC = ['STD_ID_GEO_DIV'];
            var validValueFunctionCountry = function (idForm, obj) {
                if (obj !== undefined && obj !== null) {
                    var form = new meta4.exports.widget.Form(_utils.root.getChildById(idForm));
                    if (obj.value !== null && obj.value.length > 0) {
                        if (obj.bookMark !== undefined && obj.bookMark !== null) {
                            meta4.widget.utils.setBookMark(nodeHrContact.getObject(), obj.bookMark);
                        }

                        var countrySelected = meta4.data.utils.getValue(nodeHrContact, 'STD_ID_COUNTRY');
                        if (countrySelectedOld !== null && countrySelectedOld !== countrySelected) {
                            elementsToEmptyCountry.forEach(function (valueFlds) {
                                meta4.data.utils.setValue(nodeHrContact, valueFlds, null);
                            });
                            elementsToChangeCountry.forEach(function (valueFlds) {
                                meta4.data.utils.setValue(nodeHrContact, valueFlds, null);
                            });
                            elementsToEnabledDisabledSubGeoToChangeC.forEach(function (valueFlds) {
                                if (_utils.notIsNullUndefined(form.inner)) {
                                    form.enableColumnOfRow(valueFlds);
                                }
                                meta4.data.utils.setValue(nodeHrContact, valueFlds, null);
                            });
                            if (_utils.notIsNullUndefined(form.inner)) {
                                form.disableColumnOfRow('STD_ID_GEO_PLACE');
                            }
                            meta4.data.utils.setValue(nodeHrContact, 'STD_ID_GEO_PLACE', null);
                        }
                        //Tenemos valor de pais. Hay que habilitar las listas de provincia ,poblacion, zona geografica, campo libre poblacion, campo libre provincia
                        //codigo postal y las lineas de direcciones
                        if (_utils.notIsNullUndefined(form.inner)) {
                            elementsToEnabledDisabledCountry.forEach(function (valueFlds) {
                                form.enableColumnOfRow(valueFlds);
                            });
                        }
                        countrySelectedOld = countrySelected;
                    } else {
                        //Las lista de provincia y poblacion se vacian automaticamente y hay que bloquearlas. El resto se vacia manualmente y se bloquea.
                        elementsToEmptyCountry.forEach(function (valueFlds) {
                            meta4.data.utils.setValue(nodeHrContact, valueFlds, null);
                        });
                        if (_utils.notIsNullUndefined(form.inner)) {
                            elementsToEnabledDisabledCountry.forEach(function (valueFlds) {
                                form.disableColumnOfRow(valueFlds);
                            });
                        }
                    }
                }
            }.bind(this, args.idForm);
            listCountryAddressHrContact = _utils.setOptionsList(listCountryAddressHrContact, [{
                    'itemQBF': 'STD_ID_COUNTRY',
                    'item': 'STD_ID_COUNTRY'
                }], 'SRCO_PA_WZ_HR_CONTACT', 'STD_ID_COUNTRY');
            //listCountryAddressHrContact.setOnValidValue(refreshDataAddress);
            listCountryAddressHrContact.setOnValidValue(validValueFunctionCountry);
            listCountryAddressHrContact.setCheckInitialValue(true);
        }
        formHrContactPerson.addChild(listCountryAddressHrContact);

        //Linea direccion 1
        formHrContactPerson.addChild(_utils.getInput('SUK_ADDRESS_LINE_1'));
        //Linea direccion 2
        formHrContactPerson.addChild(_utils.getInput('SUK_ADDRESS_LINE_2'));
        //Linea direccion 3
        formHrContactPerson.addChild(_utils.getInput('SUK_ADDRESS_LINE_3'));
        //Linea direccion 4
        formHrContactPerson.addChild(_utils.getInput('SUK_ADDRESS_LINE_4'));
        //Codigo postal
        formHrContactPerson.addChild(_utils.getInput('SUK_ZIP_CODE'));

        //Poblacion
        listSubGeoDivAddressHrContact = _getList('STD_ID_SUB_GEO_DIV');
        if (_utils.notIsNullUndefined(listSubGeoDivAddressHrContact)) {
            var elementsToEnabledDisabledSubGeo = ['STD_ID_GEO_DIV'];
            var contactPGeoPlaceSelectedOld = null;
            var validValueFunctionSubGeo = function (idForm, obj) {
                if (obj !== undefined && obj !== null) {
                    var form = new meta4.exports.widget.Form(_utils.root.getChildById(idForm));
                    if (obj.bookMark !== undefined && obj.bookMark !== null) {
                        meta4.widget.utils.setBookMark(nodeHrContact.getObject(), obj.bookMark);
                    }

                    var countrySelected = meta4.data.utils.getValue(nodeHrContact, 'STD_ID_COUNTRY');
                    if (countrySelected !== undefined && countrySelected !== null && countrySelected.length > 0) {
                        if (obj.value !== null && obj.value.length > 0) {
                            //Tenemos valor de poblacion. La lista de provincia se rellena de forma automatica y aqui se bloquea
                            meta4.data.utils.setValue(nodeHrContact, 'PLCO_NM_GEO_DIV', null);
                            if (_utils.notIsNullUndefined(form.inner)) {
                                elementsToEnabledDisabledSubGeo.forEach(function (valueFlds) {
                                    form.disableColumnOfRow(valueFlds);
                                });

                                form.enableColumnOfRow('STD_ID_GEO_PLACE');
                            }
                            if (contactPGeoPlaceSelectedOld !== null && contactPGeoPlaceSelectedOld !== obj.value) {
                                meta4.data.utils.setValue(nodeHrContact, 'STD_ID_GEO_PLACE', null);
                            }
                            contactPGeoPlaceSelectedOld = obj.value;
                        } else {
                            //No tenemos valor de poblacion. La lista de provincia se vacia de forma automatica y se habilita
                            elementsToEnabledDisabledSubGeo.forEach(function (valueFlds) {
                                if (_utils.notIsNullUndefined(form.inner)) {
                                    form.enableColumnOfRow(valueFlds);
                                }
                                meta4.data.utils.setValue(nodeHrContact, valueFlds, null);
                            });
                            if (_utils.notIsNullUndefined(form.inner)) {
                                form.disableColumnOfRow('STD_ID_GEO_PLACE');
                            }
                            meta4.data.utils.setValue(nodeHrContact, 'STD_ID_GEO_PLACE', null);
                        }
                    } else {
                        if (_utils.notIsNullUndefined(form.inner)) {
                            form.disableColumnOfRow('STD_ID_GEO_PLACE');
                        }
                        meta4.data.utils.setValue(nodeHrContact, 'STD_ID_GEO_PLACE', null);
                    }
                }
            }.bind(this, args.idForm);

            listSubGeoDivAddressHrContact = _utils.setOptionsList(listSubGeoDivAddressHrContact, [{
                    'itemQBF': 'STD_ID_SUB_GEO_DIV',
                    'item': 'STD_ID_SUB_GEO_DIV'
                }, {
                    'itemQBF': 'STD_ID_GEO_DIV',
                    'item': 'STD_ID_GEO_DIV'
                }, {
                    'itemQBF': 'STD_ID_COUNTRY',
                    'item': 'STD_ID_COUNTRY'
                }], null, null, ['STD_ID_COUNTRY', 'STD_ID_GEO_DIV']);
            listSubGeoDivAddressHrContact.options.resolution.sourceItemIds = ['STD_ID_COUNTRY', 'STD_ID_GEO_DIV', 'STD_ID_SUB_GEO_DIV'];
            listSubGeoDivAddressHrContact.setOnValidValue(validValueFunctionSubGeo);
            listSubGeoDivAddressHrContact.setCheckInitialValue(true);
            listSubGeoDivAddressHrContact.setRemoveAlternativeResultWhenReset(false);
            listSubGeoDivAddressHrContact.setDeleteNestedItems(['STD_ID_COUNTRY']);
            listSubGeoDivAddressHrContact.setDisabled(); //Se debe bloquear por defecto hasta que haya valor en pais
        }
        //Poblacion canpo libre
        nSubGeoDiv = _utils.getInput('PLCO_NM_TOWN');
        //Multicampo Poblacion-Poblacion canpo libre
        if (listSubGeoDivAddressHrContact !== null || nSubGeoDiv !== null) {
            multiSUB_GEO_DIV = new meta4.exports.widget.MultipleItem();
            multiSUB_GEO_DIV.setId('PER_STD_ID_SUB_GEO_DIV_PLCO_NM_TOWN');
            if (listSubGeoDivAddressHrContact !== null) {
                multiSUB_GEO_DIV.addChild(listSubGeoDivAddressHrContact);
            }

            if (_utils.infoMode !== 1 && nSubGeoDiv !== null && listSubGeoDivAddressHrContact !== null) {
                var labelSUB_GEO_DIV = _utils.getLabel('PLCO_LB_OR_SUB_GEO_DIV', {
                    visible: 1,
                    editable: 1
                });
                if (_utils.notIsNullUndefined(labelSUB_GEO_DIV)) {
                    labelSUB_GEO_DIV.setHideInTable(true);
                    labelSUB_GEO_DIV.setText(_utils.currentDataNode.getItemMetadata('PLCO_LB_OR_SUB_GEO_DIV').getProperty('Name'));
                    labelSUB_GEO_DIV.setClass('m4-minPaddingRight');
                    labelSUB_GEO_DIV.setClassTdDiv('labelSeparatorOr');
                    //multiSUB_GEO_DIV.addChild(labelSUB_GEO_DIV);
                }
            }

            multiSUB_GEO_DIV.addChild(nSubGeoDiv);
        }
        formHrContactPerson.addChild(multiSUB_GEO_DIV);
        //Zona geografica
        listGeoPlaceAddressHrContact = _getList('STD_ID_GEO_PLACE');
        if (_utils.notIsNullUndefined(listGeoPlaceAddressHrContact)) {
            listGeoPlaceAddressHrContact = _utils.setOptionsList(listGeoPlaceAddressHrContact, [{
                    'itemQBF': 'STD_ID_GEO_PLACE',
                    'item': 'STD_ID_GEO_PLACE'
                }], null, null, ['STD_ID_COUNTRY', 'STD_ID_GEO_DIV', 'STD_ID_SUB_GEO_DIV']);
            listGeoPlaceAddressHrContact.options.resolution.sourceItemIds = ['STD_ID_COUNTRY', 'STD_ID_GEO_DIV', 'STD_ID_SUB_GEO_DIV', 'STD_ID_GEO_PLACE'];
            listGeoPlaceAddressHrContact.setDisabled(); //Se debe bloquear por defecto hasta que haya valor en poblacion            
        }
        formHrContactPerson.addChild(listGeoPlaceAddressHrContact);

        //Provincia
        listGeoDivAddressHrContact = _getList('STD_ID_GEO_DIV');
        if (_utils.notIsNullUndefined(listGeoDivAddressHrContact)) {
            listGeoDivAddressHrContact = _utils.setOptionsList(listGeoDivAddressHrContact, [{
                    'itemQBF': 'STD_ID_GEO_DIV',
                    'item': 'STD_ID_GEO_DIV'
                }, {
                    'itemQBF': 'STD_ID_COUNTRY',
                    'item': 'STD_ID_COUNTRY'
                }], null, null, ['STD_ID_COUNTRY']);
            listGeoDivAddressHrContact.options.resolution.sourceItemIds = ['STD_ID_COUNTRY', 'STD_ID_GEO_DIV'];
            listGeoDivAddressHrContact.setRemoveAlternativeResultWhenReset(false);
            listGeoDivAddressHrContact.setDisabled(); //Se debe bloquear por defecto hasta que haya valor en pais
        }
        //Provincia canpo libre
        nGeoDiv = _utils.getInput('PLCO_NM_GEO_DIV');
        //Multicampo Provincia-Provincia canpo libre
        if (listGeoDivAddressHrContact !== null || nGeoDiv !== null) {
            multiGEO_DIV = new meta4.exports.widget.MultipleItem();
            multiGEO_DIV.setId('PER_STD_ID_GEO_DIV_PLCO_NM_GEO_DIV');
            if (listGeoDivAddressHrContact !== null) {
                multiGEO_DIV.addChild(listGeoDivAddressHrContact);
            }

            if (_utils.infoMode !== 1 && nGeoDiv !== null && listGeoDivAddressHrContact !== null) {
                var labelGEO_DIV = _utils.getLabel('PLCO_LB_OR_GEO_DIV', {
                    visible: 1,
                    editable: 1
                });
                if (_utils.notIsNullUndefined(labelGEO_DIV)) {
                    labelGEO_DIV.setHideInTable(true);
                    labelGEO_DIV.setText(_utils.currentDataNode.getItemMetadata('PLCO_LB_OR_GEO_DIV').getProperty('Name'));
                    labelGEO_DIV.setClass('m4-minPaddingRight');
                    labelGEO_DIV.setClassTdDiv('labelSeparatorOr');
                    //multiGEO_DIV.addChild(labelGEO_DIV);
                }
            }

            multiGEO_DIV.addChild(nGeoDiv);
        }
        formHrContactPerson.addChild(multiGEO_DIV);
        _listFormHrContactPerson.push(formHrContactPerson);
        formHrContactPerson.setValidations(_utils.validationForms);
        _utils.validationForms = [];

        return formHrContactPerson;
    }

    /**
     * Crea el objeto expander que contendra datos contactos de emergencia de la persona
     * @returns {meta4.exports.widget.Expander} _getExpandeHrContactPerson
     */
    function _getExpandeHrContactPerson() {
        /** @type meta4.exports.widget.Expander */
        _expanderHrContactPerson = _utils.getExpanderVisible(_expander.HR_CONTACT_PERSON, meta4.widget.translate.getTranslate('expcontact'), null, _tab.getId());
        if (_expanderHrContactPerson) {
            var args = {
                expander: _expanderHrContactPerson,
                id: 'formHrContactPerson',
                idTable: 'STD_HR_CONTACT',
                empModDef: _empModDef,
                prevFn: _getFormHrContactPerson,
                that: this
            };
            _utils.paintEmpMod(args);
        }
        return _expanderHrContactPerson;
    }

    /**
     * Crea el objeto fomulario que contendra los campos datos bancarios de la persona
     * @argument {Object} args - objeto con la informacion de las modificaciones del empleado
     * @returns {meta4.exports.widget.Form} _getFormBankPerson
     */
    function _getFormBankPerson(args) {
        var formBankPerson = null;
        var inputIdBankbranch = null;
        var inputAccountNumber = null;
        var inputIban = null;
        var inputCCI = null;
        var listBanks = null;
        var listCompBanks = null;
        var listAllObjs = [];
        var nodeHrType = _utils.data.t3Person.nodeHrType.node;
        var nodeBank = null;
        var isEmpMod = false;
        var isAdd = false;
        var radioInit = -1;
        var _radioBankActive = null; //Controla que opcion de banco esa seleccionada 

        if (args.dataEmpMod) { //Usamos los datos del canal copy
            _utils.currentDataNode = args.dataEmpMod.t3Person.nodeBank.node;
            nodeBank = args.dataEmpMod.t3Person.nodeBank.node;
            _utils.objT3 = _utils.data.t3Person.t3;
            isEmpMod = true;
            if (args.idAction === _utils.ADD) {
                isAdd = true;
            }
        } else {
            _utils.currentDataNode = _utils.data.t3Person.nodeBank.node;
            nodeBank = _utils.data.t3Person.nodeBank.node;
        }

        function getIdSection(radioBankActive) {
            radioBankActive = (radioBankActive !== undefined || radioBankActive !== null) ? radioBankActive : _radioBankActive;
            var listPayroll = [];
            var idSection = 'BANK_DATA_GEN'; //radioBankActive === 0
            if (radioBankActive === 1) {
                idSection = 'BANK_DATA_IBAN';
            } else if (radioBankActive === 2 && _listSuffix.indexOf(_payrollItemParam) > -1) {
                idSection = 'BANK_DATA_' + _payrollItemParam;
            }
            return idSection;
        }

        //Mostramos / ocultamos los campos segun corresponda
        function hideShowBanksFields(form, radioBankActive, node) {
            var result = null;
            if (form) {
                var idSection = getIdSection(radioBankActive);
                _utils.setLocalConfigurationItemSelected(idSection, node);
                var infoChannel = _utils.getInfoChannel(node);
                var idNode = _utils.getIdLocalizedNode(idSection, infoChannel.idRealChannel);
                result = _utils.applyLocalizedConf(idSection, infoChannel.idChannel, idNode, form);
                _utils.setAllNull(nodeBank, result.hidden);
            }
        }

        var refreshDataBank = function (idForm, position) {
            var form = new meta4.exports.widget.Form(_utils.root.getChildById(idForm));
            var node = null;
            if (form.inner) {
                node = form.getChannel().getNode(nodeBank.getId());
                if (node && node.count() > 0) {
                    node.moveTo(position);
                    hideShowBanksFields(form, _radioBankActive, node);
                }
            }
        }.bind(this, args.idForm, nodeBank.getCurrent());

        var refreshFormBank = function (argsRefresh) {
            if (argsRefresh && argsRefresh.node && argsRefresh.position > -1) {
                if (argsRefresh.node.count() > 0) {
                    argsRefresh.node.moveTo(argsRefresh.position);
                    hideShowBanksFields(argsRefresh.form, argsRefresh.radioBankActive, argsRefresh.node);
                }
            }
        };


        function getRadioRadioButtonBankAccount(isRedraw) {
            var radioButton = null;
            var paintAll = false;
            var listValues = [];
            var fieldId = 'PLCO_FL_RB_OTHER_FORMAT'; //En este se guarda el valor
            var propertiesItem = _utils.getConfigItem('PLCO_FL_RB_ACC_FORMAT'); //Este contiene la configuracion

            function setsValuesChangeRB() {
                switch (_radioBankActive) {
                    case 0:
                        meta4.data.utils.setValue(nodeBank, 'PLCO_FL_RB_OTHER_FORMAT', 1);
                        meta4.data.utils.setValue(nodeBank, 'PLCO_IBAN_COMPLETE', '0');
                        meta4.data.utils.setValue(nodeBank, 'SCO_ID_STANDARD', 'COR');
                        break;
                    case 1:
                        meta4.data.utils.setValue(nodeBank, 'PLCO_FL_RB_IBAN', 1);
                        meta4.data.utils.setValue(nodeBank, 'PLCO_IBAN_COMPLETE', '1');
                        meta4.data.utils.setValue(nodeBank, 'SCO_ID_STANDARD', 'COR');
                        break;
                    case 2:
                        meta4.data.utils.setValue(nodeBank, 'PLCO_FL_RB_LOCAL_FORMAT', 1);
                        meta4.data.utils.setValue(nodeBank, 'PLCO_IBAN_COMPLETE', '0');
                        meta4.data.utils.setValue(nodeBank, 'SCO_ID_STANDARD', _payrollItemParam);
                        break;
                }
            }

            function resetRadioButton() {
                if (radioInit === -1) {
                    meta4.data.utils.setValue(nodeBank, 'PLCO_FL_RB_OTHER_FORMAT', 0);
                    meta4.data.utils.setValue(nodeBank, 'PLCO_FL_RB_IBAN', 0);
                    meta4.data.utils.setValue(nodeBank, 'PLCO_FL_RB_LOCAL_FORMAT', 0);
                }
            }

            function getDefault() {
                if (propertiesItem.default && isAdd) { //Si hay configuracion por defecto se aplica lo primero
                    if (propertiesItem.default === '0') {
                        _radioBankActive = 0;
                    } else if (propertiesItem.default === '1') {
                        _radioBankActive = 1;
                    } else {
                        _radioBankActive = 2;
                    }
                }
            }

            function getValueConfig() {
                if (propertiesItem.value) { //Hay posibles valores
                    listValues = propertiesItem.value.split(_separator);
                    if (listValues.length === 1) { // un unico valor posible --> Se muestran todos deshabilitados
                        paintAll = true;
                        _radioBankActive = listValues[0].toInt();
                    }
                } else if (!propertiesItem.value && !propertiesItem.default) { //Nada configurado
                    paintAll = true;
                } else if (propertiesItem.default && listValues.length === 0) { //Sin valores posibles pero con una config por defecto
                    paintAll = true;
                }

                if (listValues.length === 0 || paintAll || listValues.indexOf("0") > -1) {
                    if (_radioBankActive === null) {
                        _radioBankActive = 0;
                    }
                }
                if (paintAll || listValues.indexOf("1") > -1) {
                    if (_radioBankActive === null) {
                        _radioBankActive = 1;
                    }
                }
                //Si tenemos valor se cambia el valor asignado de defecto / configuracion
                if (radioInit !== -1) {
                    _radioBankActive = radioInit;
                }
            }

            function onChangeRadioButton(object) {
                resetRadioButton();
                if (object.item === 'PLCO_FL_RB_OTHER_FORMAT') {
                    _radioBankActive = 0;
                    setsValuesChangeRB();
                }
                if (object.item === 'PLCO_FL_RB_IBAN') {
                    _radioBankActive = 1;
                    setsValuesChangeRB();
                }
                if (object.item === 'PLCO_FL_RB_LOCAL_FORMAT') {
                    _radioBankActive = 2;
                    setsValuesChangeRB();
                }
                refreshDataBank();
            }

            function getRadioButon() {
                var radioButton = new meta4.exports.widget.m4RadioButton();
                radioButton.setId(fieldId);
                radioButton.setIsPk(propertiesItem.mandatory);
                radioButton.setLabelText('');
                radioButton.setTrueValue(1);
                radioButton.setFalseValue(0);
                radioButton.setMode('horizontal');
                radioButton.setSvg(true);
                radioButton.setOnChangeRadio(onChangeRadioButton.bind(this));
                radioButton.setDisabled(!propertiesItem.editable);
                return radioButton;
            }

            if (propertiesItem.visible && (isAdd || args.readOnly === false)) {
                radioButton = getRadioButon();
                if ((_utils.generalConfig.readOnly && args.readOnly === undefined) || (_utils.generalConfig.readOnly && args.readOnly === true)) {
                    radioButton.setHidden(true);
                }

                if (isRedraw !== true) { //Es la primera carga
                    _radioBankActive = null;
                    resetRadioButton();
                    getDefault();
                }
                if (isAdd) {
                    if (propertiesItem.value) { //Hay posibles valores
                        listValues = propertiesItem.value.split(_separator);
                        if (listValues.length === 1) { // un unico valor posible --> Se muestran todos deshabilitados
                            paintAll = true;
                            radioButton.setDisabled(true);
                            _radioBankActive = listValues[0].toInt();
                        }
                    } else if (!propertiesItem.value && !propertiesItem.default) { //Nada configurado
                        paintAll = true;
                    } else if (propertiesItem.default && listValues.length === 0) { //Sin valores posibles pero con una config por defecto
                        paintAll = true;
                    }
                } else {
                    paintAll = true;
                }
                //Formato generico 
                if (listValues.length === 0 || paintAll || listValues.indexOf("0") > -1) {
                    radioButton.addItemTypes(_utils.getItemTypes('PLCO_FL_RB_OTHER_FORMAT', 'radio'));
                    if (_radioBankActive === null) {
                        _radioBankActive = 0;
                    }
                }
                //IBAN
                if (paintAll || listValues.indexOf("1") > -1) {
                    radioButton.addItemTypes(_utils.getItemTypes('PLCO_FL_RB_IBAN', 'radio'));
                    if (_radioBankActive === null) {
                        _radioBankActive = 1;
                    }
                }

                //Formato local
                if (paintAll || listValues.indexOf("2") > -1) {
                    var listToExclude = ['ES', 'FR', 'COR'];
                    if (listToExclude.indexOf(_payrollItemParam) === -1) {
                        var lblLocalFormat = getTranslation();
                        if (lblLocalFormat) {
                            radioButton.addItemTypes(_utils.getItemTypes('PLCO_FL_RB_LOCAL_FORMAT', 'radio', lblLocalFormat));
                        }
                    }
                    if (_radioBankActive === null) {
                        _radioBankActive = 2;
                    }
                }

                if (radioInit !== -1) {
                    _radioBankActive = radioInit;
                }

                setsValuesChangeRB();
            } else if (!isAdd) {
                _radioBankActive = radioInit;
            } else {
                getDefault();
                getValueConfig();
            }
            return radioButton;
        }

        //Devuelve el nombre del tipo de formato
        function getTranslation() {
            var suffix = _payrollItemParam;
            var translate = null;
            if (_listSuffix.indexOf(suffix) > -1) {
                translate = meta4.widget.translate.getTranslate('bankFormat' + suffix);
            }
            return translate;
        }

        //dependiendo del tipo de pago devuelve si los datos bancarios deben de ser obligatorios
        function getPaymCheck() {
            var bankAccountMandatory = '';
            if (nodeHrType.count() > 0 && nodeHrType.getCurrent() !== -1) {
                bankAccountMandatory = meta4.data.utils.getValue(nodeHrType, 'PLCO_BANK_ACCOUNT_MANDATORY');
            }
            if (bankAccountMandatory !== '1') {
                return false;
            }

            _BPOInd = meta4.data.utils.getValue(_utils.data.t3Person.nodePerson.node, 'PLCO_PA_BPO_INDICATOR');
            if (_BPOInd === 'MX' || _BPOInd === 'CO' || _BPOInd === 'EC' || _BPOInd === 'CL' || _BPOInd === 'AR' || _BPOInd === 'PE' || _BPOInd === 'SV') {
                if (meta4.data.utils.getValue(nodeBank, 'PLCO_FL_PAYM_CHECK') !== '1') {
                    return false;
                }
            }
            return true;
        }
        //Listado de bancos
        function getM4ListJS_PLCO_V_NM_BANKS(propertiesItem) {
            var listMS = _getList('PLCO_ID_BANK', null, null, null, propertiesItem);
            if (_utils.notIsNullUndefined(listMS)) {
                listMS = _utils.setOptionsList(listMS, [{
                        'itemQBF': 'PLCO_ID_BANK',
                        'item': 'PLCO_ID_BANK'
                    }]);
            }
            return listMS;
        }
        //Listado de banco de empresa
        function getM4ListJS_PLCO_V_NM_COMP_BANK(propertiesItem) {
            var listMS = _getList('PLCO_ID_COMP_BANK');
            if (_utils.notIsNullUndefined(listMS)) {
                listMS = _utils.setOptionsList(listMS, [{
                        'itemQBF': 'SCO_ID_COMP_BANK',
                        'item': 'PLCO_ID_COMP_BANK'
                    }]);
            }
            return listMS;
        }

        //TODO: Esta funcion deberia de hacerse en el canal pero no está funcionando en el canal copia
        function full_FL_RB_IBAN(valuesBank) {
            var standardCor = false;
            if (isEmpMod) {
                if (valuesBank.PLCO_IBAN_COMPLETE === '0') {
                    if (valuesBank.SCO_ID_STANDARD === null || valuesBank.SCO_ID_STANDARD === '' || valuesBank.SCO_ID_STANDARD === 'COR') {
                        standardCor = true;
                    }
                    if (standardCor) {
                        valuesBank.PLCO_FL_RB_IBAN = 0;
                        valuesBank.PLCO_FL_RB_LOCAL_FORMAT = 0;
                        valuesBank.PLCO_FL_RB_OTHER_FORMAT = 1;
                        valuesBank.PLCO_FL_RB_INIT = 0;
                    } else {
                        valuesBank.PLCO_FL_RB_IBAN = 0;
                        valuesBank.PLCO_FL_RB_LOCAL_FORMAT = 1;
                        valuesBank.PLCO_FL_RB_OTHER_FORMAT = 0;
                        valuesBank.PLCO_FL_RB_INIT = 2;
                    }
                } else {
                    valuesBank.PLCO_FL_RB_IBAN = 1;
                    valuesBank.PLCO_FL_RB_LOCAL_FORMAT = 0;
                    valuesBank.PLCO_FL_RB_OTHER_FORMAT = 0;
                    valuesBank.PLCO_FL_RB_INIT = 1;
                }
            }
            return valuesBank;
        }

        _separator = _utils.getSeparator();
        var valuesBank = meta4.data.utils.getItemsValues(nodeBank, ['PLCO_PAYROLL_INT_PARAM', 'PLCO_FL_RB_INIT', 'PLCO_FL_RB_IBAN', 'PLCO_FL_RB_LOCAL_FORMAT', 'SCO_ID_STANDARD', 'PLCO_IBAN_COMPLETE']);
        valuesBank = full_FL_RB_IBAN(valuesBank);

        _payrollItemParam = valuesBank.PLCO_PAYROLL_INT_PARAM;
        if(!isAdd){
            radioInit = valuesBank.PLCO_FL_RB_INIT;
            if (!radioInit || radioInit === -1) {
                radioInit = 0;
                if (valuesBank.PLCO_FL_RB_IBAN === 1) {
                    radioInit = 1;
                } else if (valuesBank.PLCO_FL_RB_LOCAL_FORMAT === 1) {
                    radioInit = 2;
                }
            }
            _radioBankActive = radioInit;
        }

        //crear formulario
        formBankPerson = _getFormToSection(args.idForm, _utils.data.t3Person.nodeBank.id, nodeBank, nodeBank.getObject());
        //Titular
        var inputEntitled = _utils.getInput('SCO_ENTITLED'); //Se mira este campo para que en los cambios se asigne o no el nombre al titular 
        if (_utils.notIsNullUndefined(inputEntitled)) {
            var addOtherItems = true;
            if (isEmpMod) {
                if (isAdd) {
                    meta4.data.utils.setValue(nodeBank, 'SCO_ENTITLED', meta4.data.utils.getValue(_utils.nodeEmployeeInfo, 'SCO_GB_NAME'));
                }
            }
            if (_utils.generalConfig.readOnly) {
                var inputWitOutValue = meta4.data.utils.getValue(_utils.currentDataNode, 'SCO_ENTITLED');
                if (!_utils.notIsNullUndefined(inputWitOutValue) || inputWitOutValue.length === 0) {
                    addOtherItems = false;
                }
            }
            if (addOtherItems) {
                var otherItems = _utils.getOtherItems('SCO_ENTITLED', {
                    dtStart: 'SCO_DT_START',
                    dtEnd: 'SCO_DT_END',
                    comment: null,
                    textDtStart: meta4.widget.translate.getTranslate('dtstart'),
                    textDtEnd: meta4.widget.translate.getTranslate('dtend')
                }, formBankPerson);
                inputEntitled.addOtherItems(otherItems);
            }
        }
        formBankPerson.addChild(inputEntitled);
        //Moneda
        var listCurrencyFormBank = _getList('ID_CURRENCY');
        if (_utils.notIsNullUndefined(listCurrencyFormBank)) {
            listCurrencyFormBank = _utils.setOptionsList(listCurrencyFormBank, [{
                    'itemQBF': 'ID_CURRENCY',
                    'item': 'ID_CURRENCY'
                }]);
        }
        formBankPerson.addChild(listCurrencyFormBank);
        //Tipo de banco
        var listBankTypeFormBank = _getList('SCO_ID_BANKTYPE');
        if (_utils.notIsNullUndefined(listBankTypeFormBank)) {
            listBankTypeFormBank = _utils.setOptionsList(listBankTypeFormBank, [{
                    'itemQBF': 'SCO_ID_BANKTYPE',
                    'item': 'SCO_ID_BANKTYPE'
                }]);
        }
        formBankPerson.addChild(listBankTypeFormBank);
        //Uso de banco
        var listBankUseFormBank = _getList('SCO_ID_BANKUSE');
        if (_utils.notIsNullUndefined(listBankUseFormBank)) {
            listBankUseFormBank = _utils.setOptionsList(listBankUseFormBank, [{
                    'itemQBF': 'SCO_ID_BANKUSE',
                    'item': 'SCO_ID_BANKUSE'
                }]);
        }
        formBankPerson.addChild(listBankUseFormBank);
        var validValueFunctionPayType = function (obj) {
            //**** FALTA CODIGO DE LA VALIDACION COMO SE HACE EN EL ALTA ****
            //¿TIENE SENTIDO HACER LO DEL ALTA? ¿PORQUE SE BORRA Y RECONSTRUYE LA SECCION DE BANCOS POR CAMBIAR EL TIPO DE PAGO?
            //**** FALTA CODIGO DE LA VALIDACION COMO SE HACE EN EL ALTA ****
        };

        _BPOInd = meta4.data.utils.getValue(_utils.data.t3Person.nodePerson.node, 'PLCO_PA_BPO_INDICATOR');
        var listPaymTypeFormBank = null;
        //Tipo de pago
        if (_BPOInd.length > 0) {
            listPaymTypeFormBank = _getList('SCO_ID_PAYM_TYPE', null, null, validValueFunctionPayType);
        }
        if (_utils.notIsNullUndefined(listPaymTypeFormBank)) {
            listPaymTypeFormBank = _utils.setOptionsList(listPaymTypeFormBank, [{
                    'itemQBF': 'SCO_ID_PAYM_TYPE',
                    'item': 'SCO_ID_PAYM_TYPE'
                }]);
        }
        formBankPerson.addChild(listPaymTypeFormBank);
        formBankPerson.addChild(getRadioRadioButtonBankAccount(args.isRedraw));

        //dependiendo del tipo de pago devuelve si los datos bancarios deben de ser obligatorios
        var paymCheck = getPaymCheck();
        var ibanMandatory = meta4.data.utils.getValue(nodeBank, 'PLCO_PA_IBAN_MANDATORY');
        var paymCheckIban = paymCheck;
        if (paymCheck && ibanMandatory !== '1') {
            paymCheckIban = false;
        }
        //TODO: JRR setLocalConfigurationBanks();
        listBanks = getM4ListJS_PLCO_V_NM_BANKS(paymCheck);
        formBankPerson.addChild(listBanks);
        inputIdBankbranch = _utils.getInput('SCO_ID_BANK_BRANCH', paymCheck);
        formBankPerson.addChild(inputIdBankbranch);
        inputAccountNumber = _utils.getInput('SCO_ACCOUNT_NUMBER', paymCheck);
        formBankPerson.addChild(inputAccountNumber);
        inputCCI = _utils.getInput('PLCO_CCI', paymCheck);
        if (inputCCI) {
            var functionControlLengthCCI = function (value) {
                if (!_utils.notIsNullUndefined(value) || value.length < 20) {
                    return false;
                } else {
                    return true;
                }
            };

            if (_utils.validationForms) {
                var validationCCI = [];
                validationCCI.push('validationLengthCCI');
                validationCCI.push('PLCO_CCI');
                validationCCI.push(functionControlLengthCCI);
                validationCCI.push(meta4.widget.translate.getTranslate('cci'));
                validationCCI.push(meta4.data.ValidationTypes.error);
                _utils.validationForms.push(validationCCI);
            }
        }
        formBankPerson.addChild(inputCCI);
        listCompBanks = getM4ListJS_PLCO_V_NM_COMP_BANK();
        formBankPerson.addChild(listCompBanks);
        inputIban = _utils.getInput('SCO_GB_IBAN', paymCheckIban);
        formBankPerson.addChild(inputIban);

        listAllObjs = [inputIdBankbranch, inputAccountNumber, inputIban, listBanks, listCompBanks, inputCCI];
        // var listHideInit = refreshDataBank();
        // var formBankPersonInstanceReady = function () {
        //     _enableDisableValidationFields(formBankPerson, [], listHideInit);
        // };
        // formBankPerson.onInstanceReady(formBankPersonInstanceReady);
        _listFormBankPerson.push(formBankPerson);
        formBankPerson.setValidations(_utils.validationForms);
        _utils.validationForms = [];

        var objRefresh = {
            fn: refreshFormBank,
            args: {
                form: formBankPerson,
                node: nodeBank,
                position: nodeBank.getCurrent(),
                radioBankActive: _radioBankActive
            }
        };
        _listObjToRefreshAfterPaint.push(objRefresh);

        if (isEmpMod) { //No ejecuta el afterRun de la pestaña
            _utils.refreshFormAfterRun(args.isValidation, _listObjToRefreshAfterPaint);
        }

        return formBankPerson;
    }

    /**
     * Crea el objeto expander que contendra datos bancarios de la persona
     * @argument {Boolean} isRedraw
     * @returns {meta4.exports.widget.Expander} _getExpandeBankPerson
     */
    function _getExpandeBankPerson(isRedraw) {
        /** @type meta4.exports.widget.Expander */
        _expanderBankPerson = _utils.getExpanderVisible(_expander.BANK_DATA, meta4.widget.translate.getTranslate('expBanks'), null, _tab.getId());
        if (_expanderBankPerson) {
            var args = {
                expander: _expanderBankPerson,
                id: 'formBankPerson',
                idTable: 'SCO_PERSON_BANK',
                empModDef: _empModDef,
                prevFn: _getFormBankPerson,
                that: this,
                isRedraw: isRedraw
            };
            _utils.paintEmpMod(args);
        }
        return _expanderBankPerson;
    }

    /**
     * Crea el objeto fomulario que contendra los campos otras formas de contacto de la persona
     * @argument {Object} args - objeto con la informacion de las modificaciones del empleado
     * @returns {meta4.exports.widget.Form} _getFormOthContPerson
     */
    function _getFormOthContPerson(args) {
        var multiTypeContact = null;
        var listTypeContactOtherCont = null;
        var commnetContact = null;

        var nodeOthCont = null;
        //En funcion de si vamos por la ficha o por cambios guiados
        if (args.dataEmpMod) { //Usamos los datos del canal copy
            _utils.currentDataNode = args.dataEmpMod.t3Person.nodeOthCont.node;
            nodeOthCont = args.dataEmpMod.t3Person.nodeOthCont.node;
            _utils.objT3 = _utils.data.t3Person.t3;
        } else {
            _utils.currentDataNode = _utils.data.t3Person.nodeOthCont.node;
            nodeOthCont = _utils.data.t3Person.nodeOthCont.node;
        }

        function getListTypeContact() {
            var listMS = _getList('SCO_ID_CONTACT_TYPE');
            if (_utils.notIsNullUndefined(listMS)) {
                listMS = _utils.setOptionsList(listMS, [{
                        'itemQBF': 'SCO_ID_CONTACT_TYPE',
                        'item': 'SCO_ID_CONTACT_TYPE'
                    }]);
                var addOtherItems = true;
                if (_utils.generalConfig.readOnly) {
                    var inputWitOutValue = meta4.data.utils.getValue(_utils.currentDataNode, 'SCO_ID_CONTACT_TYPE');
                    if (!_utils.notIsNullUndefined(inputWitOutValue) || inputWitOutValue.length === 0) {
                        addOtherItems = false;
                    }
                }
                if (addOtherItems) {
                    var otherItems = _utils.getOtherItems('SCO_ID_CONTACT_TYPE', {
                        dtStart: 'SCO_DT_START',
                        dtEnd: 'SCO_DT_END',
                        comment: null,
                        textDtStart: meta4.widget.translate.getTranslate('dtstart'),
                        textDtEnd: meta4.widget.translate.getTranslate('dtend')
                    }, _formOthContPerson);
                    listMS.addOtherItems(otherItems);
                }
            }
            return listMS;
        }

        //if (_utils.data.t3Person.nodeOthCont.node.count() > 0) { Si no fallan las modificaciones al solicitar un nuevo registro
        _formOthContPerson = _getFormToSection(args.idForm, nodeOthCont.getId(), null, nodeOthCont.getObject());
        listTypeContactOtherCont = getListTypeContact();

        commnetContact = _utils.getComment('SCO_CONTACTO');

        if (listTypeContactOtherCont !== null || commnetContact !== null) {
            multiTypeContact = new meta4.exports.widget.MultipleItem();
            multiTypeContact.setId('PER_SCO_ID_CONTACT_TYPE_SCO_CONTACTO');
            if (listTypeContactOtherCont !== null) {
                multiTypeContact.addChild(listTypeContactOtherCont);
            }
            multiTypeContact.addChild(commnetContact);
        }
        _formOthContPerson.addChild(multiTypeContact);
        _formOthContPerson.setValidations(_utils.validationForms);
        _utils.validationForms = [];
        return _formOthContPerson;
    }

    /**
     * Crea el objeto expander que contendra otras formas de contacto de la persona
     * @returns {meta4.exports.widget.Expander} _getExpanderOthContPerson
     */
    function _getExpanderOthContPerson() {
        /** @type meta4.exports.widget.Expander */
        _expanderOthContPerson = _utils.getExpander(_expander.OTH_CONT_F_PERSON, meta4.widget.translate.getTranslate('expothcont'), null, _tab.getId());
        var args = {
            expander: _expanderOthContPerson,
            id: 'formOthContPerson',
            idTable: 'SCO_OTH_CONTACT_FORMS',
            empModDef: _empModDef,
            prevFn: _getFormOthContPerson,
            that: this
        };
        _utils.paintEmpMod(args);

        return _expanderOthContPerson;
    }

    /**
     * Crea el objeto fomulario que contendra los campos de direccion de la persona
     * @argument {Object} args - objeto con la informacion de las modificaciones del empleado
     * @returns {meta4.exports.widget.Form} _getFormAddressPerson
     */
    function _getFormAddressPerson(args) {
        var nodeAddress = null;
        var formAddressPerson = null;
        var inputNumVia = null;
        var listTypeViviAddress = null;
        var listSiglaDomicAddress = null;
        var inputNameVi = null;
        var maxlengthCP = 10;
        var inputZipCode = null;
        var subCountry = null;
        var lengthZipCode = null;
        var isEmpMod = false;
        var _fieldLoc = [];
        var _currentCountry = null;

        //En funcion de si vamos por la ficha o por cambios guiados
        if (args.dataEmpMod) { //Usamos los datos del canal copy
            _utils.currentDataNode = args.dataEmpMod.t3Person.nodeAddress.node;
            nodeAddress = args.dataEmpMod.t3Person.nodeAddress.node;
            _utils.objT3 = _utils.data.t3Person.t3;
            isEmpMod = true;
        } else {
            _utils.currentDataNode = _utils.data.t3Person.nodeAddress.node;
            nodeAddress = _utils.data.t3Person.nodeAddress.node;
        }
        //Tipo lugar
        function getListLocationType() {
            var listLocationType = _getList('STD_ID_LOCATION_TYPE');
            if (_utils.notIsNullUndefined(listLocationType)) {
                listLocationType = _utils.setOptionsList(listLocationType, [{
                        'itemQBF': 'STD_ID_LOCATION_TYPE',
                        'item': 'STD_ID_LOCATION_TYPE'
                    }], 'SRCO_PA_WZ_ADDRESS', 'STD_ID_LOCATION_TYPE');
                var addOtherItems = true;
                if (_utils.generalConfig.readOnly) {
                    var inputWitOutValue = meta4.data.utils.getValue(_utils.currentDataNode, 'STD_ID_LOCATION_TYPE');
                    if (!_utils.notIsNullUndefined(inputWitOutValue) || inputWitOutValue.length === 0) {
                        addOtherItems = false;
                    }
                }
                if (addOtherItems) {
                    var otherItems = _utils.getOtherItems('STD_ID_LOCATION_TYPE', {
                        comment: null
                    }, formAddressPerson);
                    listLocationType.addOtherItems(otherItems);
                }
                if (isEmpMod) {
                    if (args.idAction === _utils.ADD) {
                        listLocationType.setListMethod('LIST_ADD_GUIDED');
                    } else if (args.idAction === _utils.UPDATE || args.idAction === _utils.CORRECT || args.idAction === _utils.CHANGE) {
                        listLocationType.setListMethod('LIST_MODIFIED_GUIDED');
                        var refreshDataLocationType = function (obj) {
                            if (obj.value === '1') {
                                //Se debe bloquear por defecto para cambios de tipo 1  
                                formAddressPerson.getFormElement('STD_ID_LOCATION_TYPE').m4Disabled();
                            }
                        }.bind(this);
                        listLocationType.setCheckInitialValue(true);
                        listLocationType.setOnValidValue(refreshDataLocationType);
                    }
                }
            }
            return listLocationType;
        }

        //Pintado de direccion segun pais
        function paintItemsAddressByCountry(fieldsPainted, form) {
            if (form) {
                var formAddressPerson = form;
                var nodeAddressForm = formAddressPerson.getChannel().getNode(nodeAddress.getId());
                var payrollItemParam = meta4.data.utils.getValue(nodeAddressForm, 'PLCO_PAYROLL_INT_PARAM');
                var countryId = meta4.data.utils.getValue(nodeAddressForm, 'STD_ID_COUNTRY');                if(_currentCountry === countryId){
                    return false;
                }
                _currentCountry = countryId;
                //Localizacion francesa
                function refreshAddressFRA() {
                    var countryIdChange = meta4.data.utils.getValue(nodeAddressForm, 'STD_ID_COUNTRY');
                    if (payrollItemParam === 'FR' && payrollItemParam === countryIdChange) {
                        var numVia = meta4.data.utils.getValue(nodeAddressForm, 'SSP_NUM_VIA');
                        var compTypeVi = meta4.data.utils.getValue(nodeAddressForm, 'SME_N_TIPO_VIVIENDA');
                        var typeVi = meta4.data.utils.getValue(nodeAddressForm, 'SSP_N_SIGLA_DOMIC');
                        var nameVi = meta4.data.utils.getValue(nodeAddressForm, 'PLCO_NOM_VOIE_FRA');
                        var addressLine1 = numVia + ' ' + compTypeVi + ' ' + typeVi + ' ' + nameVi;
                        meta4.data.utils.setValue(nodeAddressForm, 'STD_ADDRESS_LINE_1', addressLine1);
                    }
                }

                //Eventos para localizacion francesa
                if (fieldsPainted === false) {
                    if (_utils.notIsNullUndefined(inputNumVia)) {
                        inputNumVia.setEventsChange(refreshAddressFRA);
                    }
                    if (_utils.notIsNullUndefined(listTypeViviAddress)) {
                        listTypeViviAddress.setOnValidValue(refreshAddressFRA);
                    }
                    if (_utils.notIsNullUndefined(listSiglaDomicAddress)) {
                        listSiglaDomicAddress.setOnValidValue(refreshAddressFRA);
                    }
                    if (_utils.notIsNullUndefined(inputNameVi)) {
                        inputNameVi.setEventsChange(refreshAddressFRA);
                    }
                }

                subCountry = payrollItemParam;
                if (payrollItemParam === 'ES' && payrollItemParam === countryId) {
                    if (inputZipCode && formAddressPerson && formAddressPerson.inner) {
                        lengthZipCode = 5;
                    }
                    meta4.data.utils.setValue(nodeAddressForm, 'SCO_ID_STANDARD', payrollItemParam);
                } else {
                    if (payrollItemParam !== countryId) {
                        subCountry = 'GLO';
                        payrollItemParam = 'COR';
                    }
                    lengthZipCode = maxlengthCP;
                }
                var idSection = 'ADDRESS_' + subCountry;
                _utils.setLocalConfigurationItemSelected(idSection, nodeAddress);
                var infoChannel = _utils.getInfoChannel(nodeAddress);
                var idNode = _utils.getIdLocalizedNode(idSection, infoChannel.idRealChannel);
                if (isEmpMod) {
                    _utils.setAllNull(nodeAddressForm, _fieldLoc);
                }
                var result = _utils.applyLocalizedConf(idSection, infoChannel.idChannel, idNode, formAddressPerson);
                _fieldLoc = result.fieldLoc;
                //formAddressPerson.disableValidateItem('STD_ID_LOCATION_TYPE');
                meta4.data.utils.setValue(nodeAddressForm, 'SCO_ID_STANDARD', payrollItemParam);
                if (inputZipCode && formAddressPerson && formAddressPerson.inner) {
                    formAddressPerson.getFormElement('STD_ZIP_CODE').maxLength = lengthZipCode;
                }
                if (countryId) {
                    enableDisableFieldsAssocCountry(true, form);
                } else {
                    enableDisableFieldsAssocCountry(false, form);
                }
            }
        }

        var enableDisableFieldsAssocCountry = function (enable, form) {
            if (!_utils.generalConfig.readOnly || isEmpMod) {
                //Provincia
                _utils.enableDisableFields('STD_ID_GEO_DIV', enable, form);
                //Poblacion
                _utils.enableDisableFields('STD_ID_SUB_GEO_DIV', enable, form);
                //Zona geografica
                _utils.enableDisableFields('STD_ID_GEO_PLACE', enable, form);
            }
        };

        //Cambio de pais
        var refreshDataAddress = function (idForm, position, obj) {
            var form = new meta4.exports.widget.Form(_utils.root.getChildById(idForm));
            var nodeAddressForm = null;
            if (_utils.notIsNullUndefined(form.inner)) {
                nodeAddressForm = form.getChannel().getNode(nodeAddress.getId());
                if (nodeAddressForm && nodeAddressForm.count() > 0) {
                    nodeAddressForm.moveTo(position);
                }
            }
            paintItemsAddressByCountry(true, form);
        }.bind(this, args.idForm, nodeAddress.getCurrent());

        var refreshFormAddress = function (argsRefresh) {
            if (argsRefresh && argsRefresh.node && argsRefresh.position > -1) {
                if (argsRefresh.node.count() > 0) {
                    argsRefresh.node.moveTo(argsRefresh.position);
                    paintItemsAddressByCountry(true, argsRefresh.form);
                }
            }
        };

        formAddressPerson = _getFormToSection(args.idForm, nodeAddress.getId(), nodeAddress, nodeAddress.getObject());
        //Tipo de lugar
        formAddressPerson.addChild(getListLocationType());
        //Pais
        var listCountryAddress = _getList('STD_ID_COUNTRY');
        if (_utils.notIsNullUndefined(listCountryAddress)) {
            listCountryAddress = _utils.setOptionsList(listCountryAddress, [{
                    'itemQBF': 'STD_ID_COUNTRY',
                    'item': 'STD_ID_COUNTRY'
                }], 'SRCO_PA_WZ_ADDRESS', 'STD_ID_COUNTRY');
            listCountryAddress.setCheckInitialValue(true);
            listCountryAddress.setOnValidValue(refreshDataAddress);
        }
        formAddressPerson.addChild(listCountryAddress);
        //Provincia
        var listGeoDivAddress = _getList('STD_ID_GEO_DIV');
        if (_utils.notIsNullUndefined(listGeoDivAddress)) {
            listGeoDivAddress = _utils.setOptionsList(listGeoDivAddress, [{
                    'itemQBF': 'STD_ID_GEO_DIV',
                    'item': 'STD_ID_GEO_DIV'
                }, {
                    'itemQBF': 'STD_ID_COUNTRY',
                    'item': 'STD_ID_COUNTRY'
                }], null, null, ['STD_ID_COUNTRY']);
            listGeoDivAddress.options.resolution.sourceItemIds = ['STD_ID_COUNTRY', 'STD_ID_GEO_DIV'];
            listGeoDivAddress.setRemoveAlternativeResultWhenReset(false);
            listGeoDivAddress.setDisabled(); //Se debe bloquear por defecto hasta que haya valor en pais           
        }
        //Provincia canpo libre
        var nGeoDiv = _utils.getInput('PLCO_NM_GEO_DIV');
        //Multicampo Provincia-Provincia canpo libre
        if (listGeoDivAddress !== null || nGeoDiv !== null) {
            var multiGEO_DIV = new meta4.exports.widget.MultipleItem();
            multiGEO_DIV.setId('PER_STD_ID_GEO_DIV_PLCO_NM_GEO_DIV');
            if (listGeoDivAddress !== null) {
                multiGEO_DIV.addChild(listGeoDivAddress);
            }

            if (_utils.infoMode !== 1 && nGeoDiv !== null && listGeoDivAddress !== null) {
                var labelGEO_DIV = _utils.getLabel('PLCO_LB_OR_GEO_DIV', {
                    visible: 1,
                    editable: 1
                });
                if (_utils.notIsNullUndefined(labelGEO_DIV)) {
                    labelGEO_DIV.setHideInTable(true);
                    labelGEO_DIV.setText(_utils.currentDataNode.getItemMetadata('PLCO_LB_OR_GEO_DIV').getProperty('Name'));
                    labelGEO_DIV.setClass('m4-minPaddingRight');
                    labelGEO_DIV.setClassTdDiv('labelSeparatorOr');
                }
            }

            multiGEO_DIV.addChild(nGeoDiv);
        }
        //formAddressPerson.addChild(multiGEO_DIV); //Esto debe estar mas abajo

        //Poblacion
        var elementsToEnabledDisabledSubGeo = ['STD_ID_GEO_DIV'];
        //Evento de poblacion
        var addGeoPlaceSelectedOld = null;
        var validValueFunctionSubGeo = function (idForm, obj) {
            if (obj !== undefined && obj !== null) {
                var form = new meta4.exports.widget.Form(_utils.root.getChildById(idForm));
                var nodeAddressForm = null;
                if (_utils.notIsNullUndefined(form.inner)) {
                    nodeAddressForm = form.getChannel().getNode(nodeAddress.getId());
                }

                //Esto es necesario para que al entrar con datos este posicionado correctamente
                if (nodeAddressForm !== null && obj.bookMark !== undefined && obj.bookMark !== null) {
                    meta4.widget.utils.setBookMark(form.getChannel(), obj.bookMark);
                }

                var countrySelected = null;
                if (nodeAddressForm !== null) {
                    countrySelected = meta4.data.utils.getValue(nodeAddressForm, 'STD_ID_COUNTRY');
                }
                if (countrySelected !== undefined && countrySelected !== null && countrySelected.length > 0) {
                    if (obj.value !== null && obj.value.length > 0) {
                        //Tenemos valor de poblacion. La lista de provincia se rellena de forma automatica y aqui se bloquea
                        meta4.data.utils.setValue(nodeAddressForm, 'PLCO_NM_GEO_DIV', null);
                        if (_utils.notIsNullUndefined(form.inner)) {
                            form.disableColumnOfRow('STD_ID_GEO_DIV');
                            form.enableColumnOfRow('STD_ID_GEO_PLACE');
                        }

                        if (addGeoPlaceSelectedOld !== null && addGeoPlaceSelectedOld !== obj.value) {
                            meta4.data.utils.setValue(nodeAddressForm, 'STD_ID_GEO_PLACE', null);
                        }
                        addGeoPlaceSelectedOld = obj.value;
                    } else {
                        //No tenemos valor de poblacion. La lista de provincia se vacia de forma automatica y se habilita
                        if (_utils.notIsNullUndefined(form.inner)) {
                            form.enableColumnOfRow('STD_ID_GEO_DIV');
                        }
                        meta4.data.utils.setValue(nodeAddressForm, 'STD_ID_GEO_DIV', null);
                        if (_utils.notIsNullUndefined(form.inner)) {
                            form.disableColumnOfRow('STD_ID_GEO_PLACE');
                        }
                        meta4.data.utils.setValue(nodeAddressForm, 'STD_ID_GEO_PLACE', null);
                    }
                } else {
                    if (_utils.notIsNullUndefined(form.inner)) {
                        form.disableColumnOfRow('STD_ID_GEO_PLACE');
                    }
                    if (nodeAddressForm !== null) {
                        meta4.data.utils.setValue(nodeAddressForm, 'STD_ID_GEO_PLACE', null);
                    }
                }
            }
        }.bind(this, args.idForm);
        var listSubGeoDivAddress = _getList('STD_ID_SUB_GEO_DIV');
        if (_utils.notIsNullUndefined(listSubGeoDivAddress)) {
            listSubGeoDivAddress = _utils.setOptionsList(listSubGeoDivAddress, [{
                    'itemQBF': 'STD_ID_SUB_GEO_DIV',
                    'item': 'STD_ID_SUB_GEO_DIV'
                }, {
                    'itemQBF': 'STD_ID_GEO_DIV',
                    'item': 'STD_ID_GEO_DIV'
                }, {
                    'itemQBF': 'STD_ID_COUNTRY',
                    'item': 'STD_ID_COUNTRY'
                }], null, null, ['STD_ID_COUNTRY', 'STD_ID_GEO_DIV']);
            listSubGeoDivAddress.options.resolution.sourceItemIds = ['STD_ID_COUNTRY', 'STD_ID_GEO_DIV', 'STD_ID_SUB_GEO_DIV'];
            listSubGeoDivAddress.setCheckInitialValue(true);
            listSubGeoDivAddress.setRemoveAlternativeResultWhenReset(false);
            listSubGeoDivAddress.setDeleteNestedItems(['STD_ID_COUNTRY']);
            listSubGeoDivAddress.setOnValidValue(validValueFunctionSubGeo);
            listSubGeoDivAddress.setDisabled(); //Se debe bloquear por defecto hasta que haya valor en pais            
        }

        //Poblacion canpo libre
        var nSubGeoDiv = _utils.getInput('SGE_NM_ORT');
        //Multicampo Poblacion-Poblacion canpo libre
        if (listSubGeoDivAddress !== null || nSubGeoDiv !== null) {
            var multiSUB_GEO_DIV = new meta4.exports.widget.MultipleItem();
            multiSUB_GEO_DIV.setId('PER_STD_ID_SUB_GEO_DIV_SGE_NM_ORT');
            if (listSubGeoDivAddress !== null) {
                multiSUB_GEO_DIV.addChild(listSubGeoDivAddress);
            }
            if (_utils.infoMode !== 1 && nSubGeoDiv !== null && listSubGeoDivAddress !== null) {
                var labelSUB_GEO_DIV = _utils.getLabel('PLCO_LB_OR_SUB_GEO_DIV', {
                    visible: 1,
                    editable: 1
                });
                if (_utils.notIsNullUndefined(labelSUB_GEO_DIV)) {
                    labelSUB_GEO_DIV.setHideInTable(true);
                    labelSUB_GEO_DIV.setText(_utils.currentDataNode.getItemMetadata('PLCO_LB_OR_SUB_GEO_DIV').getProperty('Name'));
                    labelSUB_GEO_DIV.setClass('m4-minPaddingRight');
                    labelSUB_GEO_DIV.setClassTdDiv('labelSeparatorOr');
                }
            }

            multiSUB_GEO_DIV.addChild(nSubGeoDiv);
        }
        //formAddressPerson.addChild(multiSUB_GEO_DIV); //Esto debe estar mas abajo

        //Zona geografica
        var listGeoPlaceAddress = _getList('STD_ID_GEO_PLACE');
        if (_utils.notIsNullUndefined(listGeoPlaceAddress)) {
            listGeoPlaceAddress = _utils.setOptionsList(listGeoPlaceAddress, [{
                    'itemQBF': 'STD_ID_GEO_PLACE',
                    'item': 'STD_ID_GEO_PLACE'
                }], null, null, ['STD_ID_COUNTRY', 'STD_ID_GEO_DIV', 'STD_ID_SUB_GEO_DIV']);
            listGeoPlaceAddress.options.resolution.sourceItemIds = ['STD_ID_COUNTRY', 'STD_ID_GEO_DIV', 'STD_ID_SUB_GEO_DIV', 'STD_ID_GEO_PLACE'];
            listGeoPlaceAddress.setDisabled(); //Se debe bloquear por defecto hasta que haya valor en poblacion            
        }
        //formAddressPerson.addChild(listGeoPlaceAddress); //Esto debe estar mas abajo

        //Control de correo
        var checkMailAddress = _utils.getRadioButton('STD_MAILING_CHECK');
        formAddressPerson.addChild(checkMailAddress);
        //Tipo de viviendda
        listTypeViviAddress = _getList('SME_ID_TIPO_VIVIENDA');
        if (_utils.notIsNullUndefined(listTypeViviAddress)) {
            listTypeViviAddress = _utils.setOptionsList(listTypeViviAddress, [{
                    'itemQBF': 'SME_ID_TIPO_VIVIENDA',
                    'item': 'SME_ID_TIPO_VIVIENDA'
                }, {
                    'itemQBF': 'SME_N_TIPO_VIVIENDA',
                    'item': 'SME_N_TIPO_VIVIENDA'
                }]);
        }
        formAddressPerson.addChild(listTypeViviAddress);

        //Tipo via domicilio
        listSiglaDomicAddress = _getList('SSP_ID_SIGLA_DOMIC');
        if (_utils.notIsNullUndefined(listSiglaDomicAddress)) {
            listSiglaDomicAddress = _utils.setOptionsList(listSiglaDomicAddress, [{
                    'itemQBF': 'SSP_ID_SIGLA_DOMIC',
                    'item': 'SSP_ID_SIGLA_DOMIC'
                }, {
                    'itemQBF': 'SSP_N_SIGLA_DOMIC',
                    'item': 'SSP_N_SIGLA_DOMIC'
                }], null, null, ['STD_ID_COUNTRY']);
            listSiglaDomicAddress.options.resolution.sourceItemIds = ['SSP_ID_SIGLA_DOMIC', 'STD_ID_COUNTRY'];
        }
        formAddressPerson.addChild(listSiglaDomicAddress);

        //Nombre de la vía
        inputNameVi = _utils.getInput('PLCO_NOM_VOIE_FRA');
        formAddressPerson.addChild(inputNameVi);

        //Dirección
        var inputAddLine1 = _utils.getInput('STD_ADDRESS_LINE_1');
        if (_utils.notIsNullUndefined(inputAddLine1)) {
            //var nodeAddress = formAddressPerson.getChannel().getNode(nodeAddress.getId());
            var payrollItemParam = meta4.data.utils.getValue(nodeAddress, 'PLCO_PAYROLL_INT_PARAM');
            var countryIdCreate = meta4.data.utils.getValue(nodeAddress, 'STD_ID_COUNTRY');
            if (payrollItemParam === 'FR' && payrollItemParam === countryIdCreate) {
                inputAddLine1.setDisabled(true);
            }
        }
        formAddressPerson.addChild(inputAddLine1);

        //Número/Manzana
        var inputNumA = _utils.getInput('PLCO_NUMERO_MANZANA');
        formAddressPerson.addChild(inputNumA);

        //Interior/Lote
        var inputIntLot = _utils.getInput('PLCO_INTERIOR_LOTE');
        formAddressPerson.addChild(inputIntLot);

        //Línea dirección 2
        var inputAddLine2 = _utils.getInput('STD_ADDRESS_LINE_2');
        formAddressPerson.addChild(inputAddLine2);

        //Tipo de vivienda
        var listTypeLivAddress = _getList('PLCO_ID_LIV_TYPE');
        if (_utils.notIsNullUndefined(listTypeLivAddress)) {
            listTypeLivAddress = _utils.setOptionsList(listTypeLivAddress, [{
                    'itemQBF': 'PLCO_ID_LIV_TYPE',
                    'item': 'PLCO_ID_LIV_TYPE'
                }]);
        }
        formAddressPerson.addChild(listTypeLivAddress);

        //Num. via
        inputNumVia = _utils.getInput('SSP_NUM_VIA');
        formAddressPerson.addChild(inputNumVia);

        //Bloque
        var inputBloq = _utils.getInput('SSP_BLOQUE');
        formAddressPerson.addChild(inputBloq);

        //Escalera
        var inputEsc = _utils.getInput('SSP_ESCALERA');
        formAddressPerson.addChild(inputEsc);

        //Piso
        var inputPis = _utils.getInput('SSP_PISO');
        formAddressPerson.addChild(inputPis);

        //Tipo de zona        
        var listZoneType = _getList('PLCO_ID_TP_ZONA');
        if (_utils.notIsNullUndefined(listZoneType)) {
            listZoneType = _utils.setOptionsList(listZoneType, [{
                    'itemQBF': 'PLCO_ID_TP_ZONA',
                    'item': 'PLCO_ID_TP_ZONA'
                }], 'SRCO_PA_WZ_ADDRESS', 'PLCO_ID_TP_ZONA');
        }
        formAddressPerson.addChild(listZoneType);

        //Apartamento
        var inputApr = _utils.getInput('PLCO_APARTAMENTO');
        formAddressPerson.addChild(inputApr);

        //Barrio
        var inputBar = _utils.getInput('PLCO_BARRIO');
        formAddressPerson.addChild(inputBar);

        //Departamento
        var inputDpt = _utils.getInput('PLCO_DEPARTMENT');
        formAddressPerson.addChild(inputDpt);

        //Vías públicas adyacentes
        var inputAdjStreet = _utils.getInput('PLCO_ADJACENT_STREET');
        formAddressPerson.addChild(inputAdjStreet);

        //Puerta
        var inputDoor = _utils.getInput('SSP_PUERTA');
        formAddressPerson.addChild(inputDoor);

        //Línea dirección 3
        var inputAddLine3 = _utils.getInput('STD_ADDRESS_LINE_3');
        formAddressPerson.addChild(inputAddLine3);

        //Línea dirección 4
        var inputAddLine4 = _utils.getInput('STD_ADDRESS_LINE_4');
        formAddressPerson.addChild(inputAddLine4);

        //Oficina de correos
        var inputBureauD = _utils.getInput('PLCO_BUREAU_DIST_FR');
        formAddressPerson.addChild(inputBureauD);

        //Codigo postal
        inputZipCode = _utils.getInput('STD_ZIP_CODE');
        if (inputZipCode) {
            formAddressPerson.addChild(inputZipCode);
        }

        //Unidad Medico familiar
        var listMedFamUniAddress = _getList('PLCO_ID_MED_FAM_UNIT');
        if (_utils.notIsNullUndefined(listMedFamUniAddress)) {
            listMedFamUniAddress = _utils.setOptionsList(listMedFamUniAddress, [{
                    'itemQBF': 'PLCO_ID_MED_FAM_UNIT',
                    'item': 'PLCO_ID_MED_FAM_UNIT'
                }]);
        }
        formAddressPerson.addChild(listMedFamUniAddress);

        //Secciones de población, zona geografica y provincia
        formAddressPerson.addChild(multiSUB_GEO_DIV);
        formAddressPerson.addChild(listGeoPlaceAddress);

        //Region
        var listRegionAddress = _getList('SCO_ID_REGION');
        if (_utils.notIsNullUndefined(listRegionAddress)) {
            listRegionAddress = _utils.setOptionsList(listRegionAddress, [{
                    'itemQBF': 'SCO_ID_REGION',
                    'item': 'SCO_ID_REGION'
                }]);
        }
        formAddressPerson.addChild(listRegionAddress);
        formAddressPerson.addChild(multiGEO_DIV);

        //Dirección en alfabeto nativo
        var inputAddressUni = _utils.getInput('PLCO_GB_ADDRESS_UNICODE');
        formAddressPerson.addChild(inputAddressUni);
        var objRefresh = {
            fn: refreshFormAddress,
            args: {
                form: formAddressPerson,
                node: nodeAddress,
                position: nodeAddress.getCurrent()
            }
        };
        _listObjToRefreshAfterPaint.push(objRefresh);

        if (isEmpMod) { //No ejecuta el afterRun de la pestaña
            _utils.refreshFormAfterRun(args.isValidation, _listObjToRefreshAfterPaint);
        }

        return formAddressPerson;
    }

    /**
     * Crea el objeto expander que contendra la direccion de la persona
     * @returns {meta4.exports.widget.Expander} _getExpanderAddressPerson
     */
    function _getExpanderAddressPerson() {
        /** @type meta4.exports.widget.Expander */
        _expanderAddressPerson = _utils.getExpanderVisible(_expander.ADDRESS, meta4.widget.translate.getTranslate('expaddress'), null, _tab.getId());
        if (_expanderAddressPerson) {
            var args = {
                expander: _expanderAddressPerson,
                id: 'formAddressPerson',
                idTable: 'STD_ADDRESS',
                empModDef: _empModDef,
                prevFn: _getFormAddressPerson,
                that: this
            };
            _utils.paintEmpMod(args);
        }
        return _expanderAddressPerson;
    }

    /**
     * Crea el objeto fomulario que contendra los campos de datos de contacto de la persona
     * @argument {Object} args - objeto con la informacion de las modificaciones del empleado
     * @returns {meta4.exports.widget.Form} _getFormContactTelFaxPerson
     */
    function _getFormContactTelFaxPerson(args) {
        var formContactPerson = null;
        var listLocationTypeContactTelFax = null;
        var listTypeLineContactTelFax = null;
        var multiDataTelFaxPerson = null;
        var countryCodeTelFax = null;
        var intRegionCodeTelFax = null;
        var nacRegionCodeTelFax = null;
        var phoneTelFax = null;

        var nodePhoneFax = null;
        //En funcion de si vamos por la ficha o por cambios guiados
        if (args.dataEmpMod) { //Usamos los datos del canal copy
            _utils.currentDataNode = args.dataEmpMod.t3Person.nodePhoneFax.node;
            nodePhoneFax = args.dataEmpMod.t3Person.nodePhoneFax.node;
            _utils.objT3 = _utils.data.t3Person.t3;
        } else {
            _utils.currentDataNode = _utils.data.t3Person.nodePhoneFax.node;
            nodePhoneFax = _utils.data.t3Person.nodePhoneFax.node;
        }

        formContactPerson = _getFormToSection(args.idForm, nodePhoneFax.getId(), nodePhoneFax, nodePhoneFax.getObject());

        //Tipo de lugar
        listLocationTypeContactTelFax = _getList('STD_ID_LOCATION_TYPE');
        if (_utils.notIsNullUndefined(listLocationTypeContactTelFax)) {
            listLocationTypeContactTelFax = _utils.setOptionsList(listLocationTypeContactTelFax, [{
                    'itemQBF': 'STD_ID_LOCATION_TYPE',
                    'item': 'STD_ID_LOCATION_TYPE'
                }], 'SRCO_PA_WZ_PHONE_FAX', 'STD_ID_LOCATION_TYPE');
            var addOtherItems = true;
            if (_utils.generalConfig.readOnly) {
                var inputWitOutValue = meta4.data.utils.getValue(_utils.currentDataNode, 'STD_ID_LOCATION_TYPE');
                if (!_utils.notIsNullUndefined(inputWitOutValue) || inputWitOutValue.length === 0) {
                    addOtherItems = false;
                }
            }
            if (addOtherItems) {
                var otherItems = _utils.getOtherItems('STD_ID_LOCATION_TYPE_CONTACT', {
                    comment: null
                }, formContactPerson);
                listLocationTypeContactTelFax.addOtherItems(otherItems);
            }
            if (args) {
                if (_utils.notIsNullUndefined(args.idAction) && args.idAction !== _utils.CLOSE) {
                    listLocationTypeContactTelFax.setListMethod('LIST_ADD_GUIDED_PHONE');
                }
            }
        }
        formContactPerson.addChild(listLocationTypeContactTelFax);

        //Prefijos / telefono
        countryCodeTelFax = _utils.getInput('STD_INT_COUNTRY_CODE');
        if (_utils.notIsNullUndefined(countryCodeTelFax)) {
            countryCodeTelFax.setClass('dataTypeNumber');
            countryCodeTelFax.setClassWidth('m4-input15');
        }
        intRegionCodeTelFax = _utils.getInput('STD_INT_REGION_CODE');
        if (_utils.notIsNullUndefined(intRegionCodeTelFax)) {
            intRegionCodeTelFax.setClass('dataTypeNumber');
            intRegionCodeTelFax.setClassWidth('m4-input15');
        }
        nacRegionCodeTelFax = _utils.getInput('STD_NAT_REGION_CODE');
        if (_utils.notIsNullUndefined(nacRegionCodeTelFax)) {
            nacRegionCodeTelFax.setClass('dataTypeNumber');
            nacRegionCodeTelFax.setClassWidth('m4-input15');
        }
        phoneTelFax = _utils.getInput('STD_PHONE');
        if (_utils.notIsNullUndefined(phoneTelFax)) {
            phoneTelFax.setClass('dataTypeNumber');
        }
        //Este es el separador
        var separatorPhoneVisible = 1;
        if ((countryCodeTelFax === null && intRegionCodeTelFax === null && nacRegionCodeTelFax === null) || phoneTelFax === null) {
            separatorPhoneVisible = 0;
        }
        //Este es el separador del telefono
        var labelST_PHONE = _utils.getLabel('PLCO_LB_TUBE_OR_CON', {
            visible: separatorPhoneVisible,
            editable: 1
        });
        if (_utils.notIsNullUndefined(labelST_PHONE)) {
            labelST_PHONE.setHideInTable(true);
            labelST_PHONE.setText(_utils.currentDataNode.getItemMetadata('PLCO_LB_TUBE_OR_CON').getProperty('Name'));
            labelST_PHONE.setClass('m4-minPaddingRight');
            labelST_PHONE.setClassTdDiv('labelSeparatorTube');
        }

        //Tipo de linea
        listTypeLineContactTelFax = _getList('STD_ID_LINE_TYPE');
        if (_utils.notIsNullUndefined(listTypeLineContactTelFax)) {
            listTypeLineContactTelFax = _utils.setOptionsList(listTypeLineContactTelFax, [{
                    'itemQBF': 'STD_ID_LINE_TYPE',
                    'item': 'STD_ID_LINE_TYPE'
                }], 'SRCO_PA_WZ_PHONE_FAX', 'STD_ID_LINE_TYPE');
        }
        //Bloque de los prefijos / telefono y el tipo de linea
        if (countryCodeTelFax !== null || intRegionCodeTelFax !== null || nacRegionCodeTelFax !== null || phoneTelFax !== null) {
            multiDataTelFaxPerson = new meta4.exports.widget.MultipleItem();
            multiDataTelFaxPerson.setId('PER_STD_INT_COUNTRY_CODE_PHONE');
            multiDataTelFaxPerson.addChild(listTypeLineContactTelFax);
            multiDataTelFaxPerson.addChild(countryCodeTelFax);
            multiDataTelFaxPerson.addChild(intRegionCodeTelFax);
            multiDataTelFaxPerson.addChild(nacRegionCodeTelFax);
            //multiDataTelFaxPerson.addChild(labelST_PHONE); 
            multiDataTelFaxPerson.addChild(phoneTelFax);
        }
        formContactPerson.addChild(multiDataTelFaxPerson);
        formContactPerson.setValidations(_utils.validationForms);
        _utils.validationForms = [];

        return formContactPerson;
    }

    /**
     * Crea el objeto fomulario que contendra los campos del email de contacto de la persona
     * @argument {Object} args - objeto con la informacion de las modificaciones del empleado
     * @returns {meta4.exports.widget.Form} _getFormContactEmailPerson
     */
    function _getFormContactEmailPerson(args) {
        var formContactEmailPerson = null;
        var multiDataEmailPerson = null;
        var listLocationTypeContactEmail = null;
        var emailData = null;

        var nodeEmail = null;
        //En funcion de si vamos por la ficha o por cambios guiados
        if (args.dataEmpMod) { //Usamos los datos del canal copy
            _utils.currentDataNode = args.dataEmpMod.t3Person.nodeEmail.node;
            nodeEmail = args.dataEmpMod.t3Person.nodeEmail.node;
            _utils.objT3 = _utils.data.t3Person.t3;
        } else {
            _utils.currentDataNode = _utils.data.t3Person.nodeEmail.node;
            nodeEmail = _utils.data.t3Person.nodeEmail.node;
        }

        formContactEmailPerson = _getFormToSection(args.idForm, nodeEmail.getId(), nodeEmail, nodeEmail.getObject());

        //Tipo de lugar
        listLocationTypeContactEmail = _getList('STD_ID_LOCATION_TYPE');
        if (_utils.notIsNullUndefined(listLocationTypeContactEmail)) {
            listLocationTypeContactEmail = _utils.setOptionsList(listLocationTypeContactEmail, [{
                    'itemQBF': 'STD_ID_LOCATION_TYPE',
                    'item': 'STD_ID_LOCATION_TYPE'
                }], 'SRCO_PA_WZ_EMAIL', 'STD_ID_LOCATION_TYPE');
            var addOtherItems = true;
            if (_utils.generalConfig.readOnly) {
                var inputWitOutValue = meta4.data.utils.getValue(_utils.currentDataNode, 'STD_ID_LOCATION_TYPE');
                if (!_utils.notIsNullUndefined(inputWitOutValue) || inputWitOutValue.length === 0) {
                    addOtherItems = false;
                }
            }
            if (addOtherItems) {
                var otherItems = _utils.getOtherItems('STD_ID_LOCATION_TYPE_CONTACT_EMAIL', {
                    comment: null
                }, formContactEmailPerson);
                listLocationTypeContactEmail.addOtherItems(otherItems);
            }
            if (args) {
                if (_utils.notIsNullUndefined(args.idAction) && args.idAction !== _utils.CLOSE) {
                    listLocationTypeContactEmail.setListMethod('LIST_ADD_GUIDED_EMAIL');
                }
            }
        }
        //Email
        emailData = _utils.getInput('STD_EMAIL');

        if (listLocationTypeContactEmail !== null || emailData !== null) {
            multiDataEmailPerson = new meta4.exports.widget.MultipleItem();
            multiDataEmailPerson.setId('PER_STD_EMAIL');
            multiDataEmailPerson.setText(_utils.currentDataNode.getItemMetadata('STD_EMAIL').getProperty('Name'));
            multiDataEmailPerson.addChild(listLocationTypeContactEmail);
            multiDataEmailPerson.addChild(emailData);
        }
        formContactEmailPerson.addChild(multiDataEmailPerson);
        formContactEmailPerson.setValidations(_utils.validationForms);
        _utils.validationForms = [];
        return formContactEmailPerson;
    }

    /**
     * Crea el objeto expander que contendra los datos de contacto de la persona
     * @returns {meta4.exports.widget.Expander} _getExpanderContactPerson
     */
    function _getExpanderContactPerson() {
        /** @type meta4.exports.widget.Expander */
        _expanderContactPerson = _utils.getExpanderVisible(_expander.CONTACTS, meta4.widget.translate.getTranslate('expcontacteltfax'), null, _tab.getId());
        if (_expanderContactPerson) {
            //Telefono / fax
            var args = {
                expander: _expanderContactPerson,
                id: 'formContactTelFax',
                idTable: 'STD_PHONE_FAX',
                empModDef: _empModDef,
                prevFn: _getFormContactTelFaxPerson,
                that: this
            };
            _utils.paintEmpMod(args);

            //Email
            args = {
                expander: _expanderContactPerson,
                id: 'formContactEmail',
                idTable: 'STD_EMAIL',
                empModDef: _empModDef,
                prevFn: _getFormContactEmailPerson,
                that: this
            };
            _utils.paintEmpMod(args);
        }
        return _expanderContactPerson;
    }

    /**
     * Crea el objeto fomulario que contendra los campos de los datos de conexion de la persona
     * @returns {meta4.exports.widget.Form} _getFormConnectionDataPerson
     */
    function _getFormConnectionDataPerson() {
        var node = _utils.data.t3Person.nodePerson.node;
        var listItems = ['PLCO_NETW_USERNAME', 'PLCO_HIST_LEGACY_ID'];
        if (_utils.areThereData(node, listItems)) {
            _formConnectionData = _getFormToSection('formConnectionPerson', _utils.data.t3Person.nodePerson.id, null, _utils.data.t3Person.t3);
            var multiDataConnect = new meta4.exports.widget.MultipleItem();
            multiDataConnect.setId('PER_PLCO_NETW_USERNAME_PLCO_HIST_LEGACY_ID');
            multiDataConnect.addChild(_utils.getInput('PLCO_NETW_USERNAME'));
            multiDataConnect.addChild(_utils.getInput('PLCO_HIST_LEGACY_ID'));
            _formConnectionData.addChild(multiDataConnect);
            _formConnectionData.setValidations(_utils.validationForms);
            _utils.validationForms = [];
        }
        return _formConnectionData;
    }
    /**
     * Crea el objeto expander que contendra los datos de conexion de la persona
     * @returns {meta4.exports.widget.Expander} _getExpanderConnectionDataPerson
     */
    function _getExpanderConnectionDataPerson() {
        /** @type meta4.exports.widget.Expander */
        _utils.currentDataNode = _utils.data.t3Person.nodePerson.node;
        _expanderConnectionDataPerson = _utils.getExpanderVisible(_expander.CONNECTION_DATA, meta4.widget.translate.getTranslate('expconnection'), true, _tab.getId());
        if (_expanderConnectionDataPerson) {
            _expanderConnectionDataPerson.addChild(_getFormConnectionDataPerson());
        }
        return _expanderConnectionDataPerson;
    }

    function _getM4ListMaritalStatus(args) {
        //En funcion de si vamos por la ficha o por cambios guiados
        if (args.dataEmpMod) { //Usamos los datos del canal copy
            _utils.currentDataNode = args.dataEmpMod.t3Person.nodeMaritalStats.node;
            _utils.objT3 = _utils.data.t3Person.t3;
        } else {
            _utils.currentDataNode = _utils.data.t3Person.nodeMaritalStats.node;
        }

        var list = _getList('STD_ID_MARITAL_STAT');
        if (_utils.notIsNullUndefined(list)) {
            list = _utils.setOptionsList(list, [{
                    'itemQBF': 'STD_ID_MARITAL_STAT',
                    'item': 'STD_ID_MARITAL_STAT'
                }]);
        }
        return list;
    }
    /**
     * Crea el objeto fomulario que contendra los campos de otros datos de la persona
     * @returns {meta4.exports.widget.Form} _getFormOtherDataPerson
     */
    function _getFormOtherDataPerson() {
        var nodePerson = null;
        _utils.currentDataNode = _utils.data.t3Person.nodePerson.node;
        nodePerson = _utils.data.t3Person.nodePerson.node;

        _formOtherDataPerson = _getFormToSection('formOtherDataPerson', nodePerson.getId(), null, nodePerson.getObject());
        if (nodePerson.count() > 0 && nodePerson.getCurrent() > -1) {
            //Tipo de veterano
            var listVeteranFormPerson = _getList('SUS_ID_VETERAN_WHERE');
            if (_utils.notIsNullUndefined(listVeteranFormPerson)) {
                listVeteranFormPerson = _utils.setOptionsList(listVeteranFormPerson, [{
                        'itemQBF': 'SUS_ID_VETERAN_WHERE',
                        'item': 'SUS_ID_VETERAN_WHERE'
                    }]);
            }
            _formOtherDataPerson.addChild(listVeteranFormPerson);
            //Grupo sanguineo
            var listBloodFormPerson = _getList('PLCO_ID_BLOOD_GROUP');
            if (_utils.notIsNullUndefined(listBloodFormPerson)) {
                listBloodFormPerson = _utils.setOptionsList(listBloodFormPerson, [{
                        'itemQBF': 'PLCO_ID_BLOOD_GROUP',
                        'item': 'PLCO_ID_BLOOD_GROUP'
                    }]);
            }
            _formOtherDataPerson.addChild(listBloodFormPerson);
            //Raza
            var listEthnicityFormPerson = _getList('SUS_ID_ETHNICITY');
            if (_utils.notIsNullUndefined(listEthnicityFormPerson)) {
                listEthnicityFormPerson = _utils.setOptionsList(listEthnicityFormPerson, [{
                        'itemQBF': 'SUS_ID_ETHNICITY',
                        'item': 'SUS_ID_ETHNICITY'
                    }]);
            }
            _formOtherDataPerson.addChild(listEthnicityFormPerson);
            //Religion
            var listReligionFormPerson = _getList('PLCO_ID_RELIGION');
            if (_utils.notIsNullUndefined(listReligionFormPerson)) {
                listReligionFormPerson = _utils.setOptionsList(listReligionFormPerson, [{
                        'itemQBF': 'PLCO_ID_RELIGION',
                        'item': 'PLCO_ID_RELIGION'
                    }]);
            }
            _formOtherDataPerson.addChild(listReligionFormPerson);
            _formOtherDataPerson.setValidations(_utils.validationForms);
            _utils.validationForms = [];
        }
        return _formOtherDataPerson;
    }

    /**
     * Crea el objeto fomulario que contendra los campos de otros datos de la persona de estado civil
     * @argument {Object} args - objeto con la informacion de las modificaciones del empleado
     * @returns {meta4.exports.widget.Form} _getFormOtherDataPerson
     */
    function _getFormOtherDataPersonMarital(args) {
        function getListMaritalStatus() {
            var listMS = _getM4ListMaritalStatus(args);
            if (_utils.notIsNullUndefined(listMS)) {
                listMS.setNode(_utils.currentDataNode);
                listMS.setRecords(_utils.isRecordForPainting.bind(_utils, _data.t3Person.nodeMaritalStats, _utils.currentDataNode));
                var addOtherItems = true;
                if (_utils.generalConfig.readOnly) {
                    var inputWitOutValue = meta4.data.utils.getValue(_utils.currentDataNode, 'STD_ID_MARITAL_STAT');
                    if (!_utils.notIsNullUndefined(inputWitOutValue) || inputWitOutValue.length === 0) {
                        addOtherItems = false;
                    }
                }
                if (addOtherItems) {
                    var otherItems = _utils.getOtherItems('STD_ID_MARITAL_STAT', {
                        comment: null
                    }, _formOtherDataPersonMarital);
                    listMS.addOtherItems(otherItems);
                }
            }
            return listMS;
        }

        var nodeMaritalStats = null;
        //En funcion de si vamos por la ficha o por cambios guiados
        if (args.dataEmpMod) { //Usamos los datos del canal copy
            nodeMaritalStats = args.dataEmpMod.t3Person.nodeMaritalStats.node;
            _utils.objT3 = _utils.data.t3Person.t3;
        } else {
            nodeMaritalStats = _utils.data.t3Person.nodeMaritalStats.node;
        }
        if (nodeMaritalStats.count() > 0 && !args.skipList) {
            _formOtherDataPersonMarital = _getFormToSection(args.idForm, nodeMaritalStats.getId(), null, nodeMaritalStats.getObject());
            _formOtherDataPersonMarital.addChild(getListMaritalStatus());
            _formOtherDataPersonMarital.setValidations(_utils.validationForms);
            _utils.validationForms = [];
        }
        return _formOtherDataPersonMarital;
    }

    /**
     * Crea el objeto expander que contendra otros datos de la persona
     * @returns {meta4.exports.widget.Expander} _getExpanderOtherDataPerson
     */
    function _getExpanderOtherDataPerson() {
        _expanderOtherDataPerson = _utils.getExpanderVisible(_expander.OTHER_DATA, meta4.widget.translate.getTranslate('expotherdata'), null, _tab.getId());
        if (_expanderOtherDataPerson) {
            _expanderOtherDataPerson.addChild(_getFormOtherDataPerson());
            var args = {
                expander: _expanderOtherDataPerson,
                id: 'formOtherDataPersonMarital',
                idTable: 'STD_HT_MAR_STAT',
                empModDef: _empModDef,
                prevFn: _getFormOtherDataPersonMarital,
                that: this
            };
            _utils.paintEmpMod(args);
        }
        return _expanderOtherDataPerson;
    }

    /**
     * Crea el objeto expander que contendra los campos buffer (tipo personal)
     * @param {Object} expanderBuffer
     * @param {Array} listExpander
     * @returns {meta4.exports.widget.Expander} _getExpanderBuffInfo
     */
    function _getExpanderBuffInfo(expanderBuffer) {
        var tableToPaint = {};
        var paintBuffer = function (listTables, isModified, argIdTable) {
            var idTable = 'PLCO_CLIENT_BUFFER_FIELDS';
            if (isModified) {
                idTable = argIdTable;
            }
            var args = {
                expander: _expanderBuffInfo,
                id: 'formBuffInfo',
                empModDef: _empModDef,
                prevFn: _getBufferFormEmpMod,
                that: this,
                listTables: listTables,
                isModified: isModified,
                idTable: idTable,
                idTab: _idTab
            };

            _utils.paintEmpMod(args);
        }.bind(this);
        /** @type meta4.exports.widget.Expander */
        _expanderBuffInfo = _utils.getExpanderVisible(_expander.ADDITIONAL_PERSONAL_DATA, meta4.widget.translate.getTranslate('_buffInfoPersonal'), null, _tab.getId());
        if (expanderBuffer && _expanderBuffInfo) {
            var listToPaint = complementary.prepareBufferToPaint(_idTab);
            if (listToPaint.modified) {
                for (var type in _utils.classData.typesFieldsBuffer) {
                    if (listToPaint.modified[type]) { //Primero pintamos los modificados, con formularios independientes
                        for (var i = 0; i < listToPaint.modified[type].length; i++) {
                            var table = listToPaint.modified[type][i];
                            tableToPaint = {};
                            tableToPaint[type] = [table];
                            paintBuffer(tableToPaint, true, table);
                        }
                    }
                }
            }
            if (listToPaint.normal) { //Luego se pinta el resto en un unico formulario
                var args = {
                    t3HrPeriod: _utils.data.t3HrPeriod,
                    expander: _expanderBuffInfo,
                    listTables: listToPaint.normal,
                    idForm: 'formBuffInfo_normal',
                    idTab: _idTab
                };
                var formBuffer = complementary.getFormBuffInfo(args);
                _expanderBuffInfo.addChild(formBuffer);
            }
            _getBuffersEmpInfo(expanderBuffer, _expanderBuffInfo);
        }
    }

    function _getBuffersEmpInfo(expanderBuffer, expanderBuffInfo) {
        var affterRunBuffer = function () {
            _utils.setDisplayExpander(_tab, expanderBuffInfo);
            _utils.afterLoadData(_tab);
        };
        var blockBuffer = _utils.getBlock('blockBufferPersonal');
        blockBuffer.addChild(expanderBuffInfo);
        _tab.addChild(blockBuffer);
        blockBuffer.run(expanderBuffer.getContainer(), affterRunBuffer);
    }

    function _getBufferFormEmpMod(opt) {
        var args = {
            t3HrPeriod: _utils.data.t3HrPeriod,
            idField: opt.idField,
            expander: _expanderBuffInfo,
            dataEmpMod: opt.dataEmpMod,
            listTables: opt.listTables,
            idForm: opt.idForm,
            idAction: opt.idAction,
            showDates: opt.showDates,
            paintEmpty: opt.paintEmpty,
            showOldValues: opt.showOldValues
        };
        return complementary.getFormBuffInfo(args);
    }

    function _getM4ListNacionality(args) {
        if (args.dataEmpMod) { //Usamos los datos del canal copy
            _utils.currentDataNode = args.dataEmpMod.t3Person.nodeNationality.node;
            _utils.objT3 = _utils.data.t3Person.t3;
        } else {
            _utils.currentDataNode = _utils.data.t3Person.nodeNationality.node;
        }

        var listMS = _getList('STD_ID_COUNTRY_NAC', 'STD_ID_COUNTRY');
        if (_utils.notIsNullUndefined(listMS)) {
            listMS = _utils.setOptionsList(listMS, [{
                    'itemQBF': 'STD_ID_COUNTRY',
                    'item': 'STD_ID_COUNTRY'
                }], 'SRCO_PA_WZ_HR_NATIONALITY', 'STD_ID_COUNTRY');
        }
        return listMS;
    }

    /**
     * Crea el objeto fomulario que contendra los campos de nacionalidad de la persona
     * @argument {Object} args - objeto con la informacion de las modificaciones del empleado
     * @returns {meta4.exports.widget.Form} _getFormNacionalityPerson
     */
    function _getFormNacionalityPerson(args) {
        var nodeNationality = null;
        //En funcion de si vamos por la ficha o por cambios guiados
        if (args.dataEmpMod) { //Usamos los datos del canal copy
            _utils.currentDataNode = args.dataEmpMod.t3Person.nodeNationality.node;
            nodeNationality = args.dataEmpMod.t3Person.nodeNationality.node;
            _utils.objT3 = _utils.data.t3Person.t3;
        } else {
            _utils.currentDataNode = _utils.data.t3Person.nodeNationality.node;
            nodeNationality = _utils.data.t3Person.nodeNationality.node;
        }

        function createListNacionality(args) {
            var listMS = _getM4ListNacionality(args);
            if (_utils.notIsNullUndefined(listMS)) {
                if (!args.existEmpMod) {
                    listMS.setRecords(_utils.isRecordForPainting.bind(_utils, _data.t3Person.nodeNationality, nodeNationality));
                }
                var addOtherItems = true;
                if (_utils.generalConfig.readOnly) {
                    var inputWitOutValue = meta4.data.utils.getValue(_utils.currentDataNode, 'STD_ID_COUNTRY');
                    if (!_utils.notIsNullUndefined(inputWitOutValue) || inputWitOutValue.length === 0) {
                        addOtherItems = false;
                    }
                }
                if (addOtherItems) {
                    var otherItems = _utils.getOtherItems('STD_ID_COUNTRY_NAC', {
                        dtStart: 'DT_START',
                        dtEnd: 'DT_END',
                        comment: null,
                        textDtStart: meta4.widget.translate.getTranslate('dtstart'),
                        textDtEnd: meta4.widget.translate.getTranslate('dtend')
                    }, _formNacionalityPerson);
                    listMS.addOtherItems(otherItems);
                }
            }
            //En funcion de si vamos por la ficha o por cambios guiados
            if (args.dataEmpMod) { //Usamos los datos del canal copy
                _utils.currentDataNode = args.dataEmpMod.t3Person.nodePerson.node;
            } else {
                _utils.currentDataNode = _utils.data.t3Person.nodePerson.node;
            }
            return listMS;
        }
        if (_utils.currentDataNode.count() > 0) {
            _formNacionalityPerson = _getFormToSection(args.idForm, nodeNationality.getId(), null, nodeNationality.getObject());
            _formNacionalityPerson.addChild(createListNacionality(args));
            _formNacionalityPerson.setValidations(_utils.validationForms);
            _utils.validationForms = [];
        } else {
            _formNacionalityPerson = null;
        }
        return _formNacionalityPerson;
    }

    /**
     * Crea el objeto fomulario que contendra los campos relacionados con el nacimiento
     * @returns {meta4.exports.widget.Form} _getFormBirthNacionalityPerson
     */
    function _getFormBirthPerson(idForm, nodePerson) {
        var multiDataPerson = null;
        var listBirthCountry = null;
        var listGeoBirth = null;
        var listSubGeo = null;

        if (nodePerson.count() > 0 && nodePerson.getCurrent() > -1) {
            //336665
            //var age = _utils.getLabel('SRCO_AGE');
            var age = _utils.getInput('SRCO_AGE', {
                editable: 0
            });
            if (_utils.notIsNullUndefined(age)) {
                age.setItemToVisualBinding(false);
                age.setClassWidth('m4-form-labelIput5');
            }

            var changeDate = function (formPerson) {
                var today = new Date();
                var dtBirth = formPerson.getFormElement('STD_DT_BIRTH').get('value');
                dtBirth = meta4.data.utils.setDateToIso(dtBirth); //convierte la fecha a iso
                dtBirth = new Date(dtBirth); //convierte a fecha
                var age = today.getFullYear() - dtBirth.getFullYear();
                var m = today.getMonth() - dtBirth.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < dtBirth.getDate())) {
                    age--;
                }
                formPerson.getFormElement('SRCO_AGE').set('value', age);
            };

            var dateBorn = _utils.getCalendar('STD_DT_BIRTH');
            if (_utils.notIsNullUndefined(dateBorn) && age) {
                dateBorn.setOnM4checkdate(changeDate.bind(this, _formPerson));
            }

            if (dateBorn !== null || age !== null) {
                multiDataPerson = new meta4.exports.widget.MultipleItem();
                multiDataPerson.setId('PER_STD_DT_BIRTH');
                if (dateBorn !== null) {
                    multiDataPerson.addChild(dateBorn);
                }
                multiDataPerson.addChild(age);
                multiDataPerson.setRecords('*');
            }
            _formPerson.addChild(multiDataPerson);

            //País nacimiento
            var countrySelectedOld = null;
            listBirthCountry = _getList('STD_ID_COUNTRY');
            if (_utils.notIsNullUndefined(listBirthCountry)) {
                var elementsToEnabledDisabledCountry = ['STD_ID_GEO_DIV', 'STD_ID_SUB_GEO_DIV'];
                var elementsToChangeCountry = ['STD_ID_SUB_GEO_DIV'];
                var elementsToEnabledDisabledSubGeoToChangeC = ['STD_ID_GEO_DIV'];
                var validValueFunctionCountry = function (obj) {
                    if (obj !== undefined && obj !== null) {
                        var form = new meta4.exports.widget.Form(_utils.root.getChildById(idForm));
                        if (obj.value !== null && obj.value.length > 0) {
                            var countrySelected = meta4.data.utils.getValue(nodePerson, 'STD_ID_COUNTRY');
                            if (countrySelectedOld !== null && countrySelectedOld !== countrySelected) {
                                elementsToChangeCountry.forEach(function (valueFlds) {
                                    meta4.data.utils.setValue(nodePerson, valueFlds, null);
                                });
                                elementsToEnabledDisabledSubGeoToChangeC.forEach(function (valueFlds) {
                                    if (_utils.notIsNullUndefined(form.inner)) {
                                        form.enableColumnOfRow(valueFlds);
                                    }
                                    meta4.data.utils.setValue(nodePerson, valueFlds, null);
                                });
                            }

                            //Tenemos valor de pais. Hay que habilitar las listas de provincia y poblacion
                            if (_utils.notIsNullUndefined(form.inner)) {
                                elementsToEnabledDisabledCountry.forEach(function (valueFlds) {
                                    form.enableColumnOfRow(valueFlds);
                                });
                            }
                            countrySelectedOld = countrySelected;
                        } else {
                            //Las lista de provincia y poblacion se vacian automaticamente y hay que bloquearlas
                            if (_utils.notIsNullUndefined(form.inner)) {
                                elementsToEnabledDisabledCountry.forEach(function (valueFlds) {
                                    form.disableColumnOfRow(valueFlds);
                                });
                            }
                        }
                    }
                };
                listBirthCountry = _utils.setOptionsList(listBirthCountry, [{
                        'itemQBF': 'STD_ID_COUNTRY',
                        'item': 'STD_ID_COUNTRY'
                    }], 'SRCO_PA_WZ_PERSON', 'STD_ID_COUNTRY');
                listBirthCountry.setOnValidValue(validValueFunctionCountry);
                listBirthCountry.setCheckInitialValue(true);
            }

            //Provincia nacimiento
            listGeoBirth = _getList('STD_ID_GEO_DIV');
            if (_utils.notIsNullUndefined(listGeoBirth)) {
                listGeoBirth = _utils.setOptionsList(listGeoBirth, [{
                        'itemQBF': 'STD_ID_GEO_DIV',
                        'item': 'STD_ID_GEO_DIV'
                    }, {
                        'itemQBF': 'STD_ID_COUNTRY',
                        'item': 'STD_ID_COUNTRY'
                    }], null, null, ['STD_ID_COUNTRY']);
                listGeoBirth.options.resolution.sourceItemIds = ['STD_ID_COUNTRY', 'STD_ID_GEO_DIV'];
                listGeoBirth.setRemoveAlternativeResultWhenReset(false);
                listGeoBirth.setDisabled(); //Se debe bloquear por defecto hasta que haya valor en pais
            }

            //Población nacimiento
            listSubGeo = _getList('STD_ID_SUB_GEO_DIV');
            if (_utils.notIsNullUndefined(listSubGeo)) {
                var validValueFunctionSubGeo = function (obj) {
                    if (obj !== undefined && obj !== null) {
                        var form = new meta4.exports.widget.Form(_utils.root.getChildById(idForm));
                        var countrySelected = meta4.data.utils.getValue(nodePerson, 'STD_ID_COUNTRY');
                        if (countrySelected !== undefined && countrySelected !== null && countrySelected.length > 0) {
                            if (obj.value !== null && obj.value.length > 0) {
                                //Tenemos valor de poblacion. La lista de provincia se rellena de forma automatica y aqui se bloquea
                                if (_utils.notIsNullUndefined(form.inner)) {
                                    form.disableColumnOfRow('STD_ID_GEO_DIV');
                                }
                            } else {
                                //No tenemos valor de poblacion. La lista de provincia se vacia de forma automatica y se habilita
                                if (_utils.notIsNullUndefined(form.inner)) {
                                    form.enableColumnOfRow('STD_ID_GEO_DIV');
                                }
                                meta4.data.utils.setValue(nodePerson, 'STD_ID_GEO_DIV', null);
                            }
                        }

                    }
                };
                listSubGeo = _utils.setOptionsList(listSubGeo, [{
                        'itemQBF': 'STD_ID_SUB_GEO_DIV',
                        'item': 'STD_ID_SUB_GEO_DIV'
                    }, {
                        'itemQBF': 'STD_ID_GEO_DIV',
                        'item': 'STD_ID_GEO_DIV'
                    }, {
                        'itemQBF': 'STD_ID_COUNTRY',
                        'item': 'STD_ID_COUNTRY'
                    }], null, null, ['STD_ID_COUNTRY', 'STD_ID_GEO_DIV']);
                listSubGeo.options.resolution.sourceItemIds = ['STD_ID_COUNTRY', 'STD_ID_GEO_DIV', 'STD_ID_SUB_GEO_DIV'];
                listSubGeo.setOnValidValue(validValueFunctionSubGeo);
                listSubGeo.setCheckInitialValue(true);
                listSubGeo.setRemoveAlternativeResultWhenReset(false);
                listSubGeo.setDeleteNestedItems(['STD_ID_COUNTRY']);
                listSubGeo.setDisabled(); //Se debe bloquear por defecto hasta que haya valor en pais
            }

            _formPerson.addChild(listBirthCountry); //Pais
            _formPerson.addChild(listSubGeo); //Poblacion
            _formPerson.addChild(listGeoBirth); //Provincia
            //_formPerson.setValidations(_utils.validationForms); Se hace en _getFormBasicPerson porque si no vaciamos las 
            //_utils.validationForms = [];                        validaciones antes de setearlas en el formulario
        }
        return _formPerson;
    }

    function _getFormBirthNacionalityPerson(idForm) {
        var multiDataPerson = null;
        var listBirthCountry = null;
        var listGeoBirth = null;
        var listSubGeo = null;
        _formBirthNatioPerson = _getFormToSection(idForm, _utils.data.t3Person.nodePerson.id, null, _utils.data.t3Person.t3);
        if (_utils.data.t3Person.nodePerson.node.count() > 0 && _utils.data.t3Person.nodePerson.node.getCurrent() > -1) {
            var dateBorn = _utils.getCalendar('STD_DT_BIRTH');
            var changeDate = function (form) {
                var request = new meta4.M4Request(form.getChannel(), _utils.data.t3Person.nodePerson.id, 'SRCO_CALC_AGE', null);
                meta4.data.execute(request);
            };

            if (_utils.notIsNullUndefined(dateBorn)) {
                dateBorn.setOnM4checkdate(changeDate.bind(this, _formBirthNatioPerson));
            }
            var age = _utils.getInput('SRCO_AGE', {
                editable: 0
            });

            if (dateBorn !== null || age !== null) {
                multiDataPerson = new meta4.exports.widget.MultipleItem();
                multiDataPerson.setId('PER_STD_DT_BIRTH');
                if (dateBorn !== null) {
                    multiDataPerson.addChild(dateBorn);
                }
                multiDataPerson.addChild(age);
                multiDataPerson.setRecords('*');
            }
            _formBirthNatioPerson.addChild(multiDataPerson);

            //País nacimiento
            var countrySelectedOld = null;
            listBirthCountry = _getList('STD_ID_COUNTRY');
            if (_utils.notIsNullUndefined(listBirthCountry)) {
                var elementsToEnabledDisabledCountry = ['STD_ID_GEO_DIV', 'STD_ID_SUB_GEO_DIV'];
                var elementsToChangeCountry = ['STD_ID_SUB_GEO_DIV'];
                var elementsToEnabledDisabledSubGeoToChangeC = ['STD_ID_GEO_DIV'];
                var validValueFunctionCountry = function (obj) {
                    if (obj !== undefined && obj !== null) {
                        var form = new meta4.exports.widget.Form(_utils.root.getChildById(idForm));
                        if (obj.value !== null && obj.value.length > 0) {
                            var countrySelected = meta4.data.utils.getValue(_utils.data.t3Person.nodePerson.node, 'STD_ID_COUNTRY');
                            if (countrySelectedOld !== null && countrySelectedOld !== countrySelected) {
                                elementsToChangeCountry.forEach(function (valueFlds) {
                                    meta4.data.utils.setValue(_utils.data.t3Person.nodePerson.node, valueFlds, null);
                                });
                                elementsToEnabledDisabledSubGeoToChangeC.forEach(function (valueFlds) {
                                    if (_utils.notIsNullUndefined(form.inner)) {
                                        form.enableColumnOfRow(valueFlds);
                                    }
                                    meta4.data.utils.setValue(_utils.data.t3Person.nodePerson.node, valueFlds, null);
                                });
                            }
                            //Tenemos valor de pais. Hay que habilitar las listas de provincia y poblacion
                            if (_utils.notIsNullUndefined(form.inner)) {
                                elementsToEnabledDisabledCountry.forEach(function (valueFlds) {
                                    form.enableColumnOfRow(valueFlds);
                                });
                            }
                            countrySelectedOld = countrySelected;
                        } else {
                            //Las lista de provincia y poblacion se vacian automaticamente y hay que bloquearlas
                            if (_utils.notIsNullUndefined(form.inner)) {
                                elementsToEnabledDisabledCountry.forEach(function (valueFlds) {
                                    form.disableColumnOfRow(valueFlds);
                                });
                            }
                        }
                    }
                };
                listBirthCountry = _utils.setOptionsList(listBirthCountry, [{
                        'itemQBF': 'STD_ID_COUNTRY',
                        'item': 'STD_ID_COUNTRY'
                    }]);
                listBirthCountry.setOnValidValue(validValueFunctionCountry);
                listBirthCountry.setCheckInitialValue(true);
            }

            //Provincia nacimiento
            listGeoBirth = _getList('STD_ID_GEO_DIV');
            if (_utils.notIsNullUndefined(listGeoBirth)) {
                listGeoBirth = _utils.setOptionsList(listGeoBirth, [{
                        'itemQBF': 'STD_ID_GEO_DIV',
                        'item': 'STD_ID_GEO_DIV'
                    }, {
                        'itemQBF': 'STD_ID_COUNTRY',
                        'item': 'STD_ID_COUNTRY'
                    }], null, null, ['STD_ID_COUNTRY']);
                listGeoBirth.options.resolution.sourceItemIds = ['STD_ID_COUNTRY', 'STD_ID_GEO_DIV'];
                listGeoBirth.setRemoveAlternativeResultWhenReset(false);
                listGeoBirth.setDisabled(); //Se debe bloquear por defecto hasta que haya valor en pais
            }

            //Población nacimiento
            listSubGeo = _getList('STD_ID_SUB_GEO_DIV');
            if (_utils.notIsNullUndefined(listSubGeo)) {
                var validValueFunctionSubGeo = function (obj) {
                    if (obj !== undefined && obj !== null) {
                        var form = new meta4.exports.widget.Form(_utils.root.getChildById(idForm));
                        var countrySelected = meta4.data.utils.getValue(_utils.data.t3Person.nodePerson.node, 'STD_ID_COUNTRY');
                        if (countrySelected !== undefined && countrySelected !== null && countrySelected.length > 0) {
                            if (obj.value !== null && obj.value.length > 0) {
                                //Tenemos valor de poblacion. La lista de provincia se rellena de forma automatica y aqui se bloquea
                                if (_utils.notIsNullUndefined(form.inner)) {
                                    form.disableColumnOfRow('STD_ID_GEO_DIV');
                                }
                            } else {
                                //No tenemos valor de poblacion. La lista de provincia se vacia de forma automatica y se habilita
                                if (_utils.notIsNullUndefined(form.inner)) {
                                    form.enableColumnOfRow('STD_ID_GEO_DIV');
                                }
                                meta4.data.utils.setValue(_utils.data.t3Person.nodePerson.node, 'STD_ID_GEO_DIV', null);
                            }
                        }

                    }
                };
                listSubGeo = _utils.setOptionsList(listSubGeo, [{
                        'itemQBF': 'STD_ID_SUB_GEO_DIV',
                        'item': 'STD_ID_SUB_GEO_DIV'
                    }, {
                        'itemQBF': 'STD_ID_GEO_DIV',
                        'item': 'STD_ID_GEO_DIV'
                    }, {
                        'itemQBF': 'STD_ID_COUNTRY',
                        'item': 'STD_ID_COUNTRY'
                    }], null, null, ['STD_ID_COUNTRY', 'STD_ID_GEO_DIV']);
                listSubGeo.options.resolution.sourceItemIds = ['STD_ID_COUNTRY', 'STD_ID_GEO_DIV', 'STD_ID_SUB_GEO_DIV'];
                listSubGeo.setOnValidValue(validValueFunctionSubGeo);
                listSubGeo.setCheckInitialValue(true);
                listSubGeo.setRemoveAlternativeResultWhenReset(false);
                listSubGeo.setDeleteNestedItems(['STD_ID_COUNTRY']);
                listSubGeo.setDisabled(); //Se debe bloquear por defecto hasta que haya valor en pais
            }

            _formBirthNatioPerson.addChild(listBirthCountry); //Pais
            _formBirthNatioPerson.addChild(listSubGeo); //Poblacion
            _formBirthNatioPerson.addChild(listGeoBirth); //Provincia
            _formBirthNatioPerson.setValidations(_utils.validationForms);
            _utils.validationForms = [];
        }
        return _formBirthNatioPerson;
    }

    /**
     * Crea el objeto expander que contendra los datos de nacimiento y nacionalidad de la persona
     * @returns {meta4.exports.widget.Expander} _getExpanderBirthNacionalityPerson
     */
    function _getExpanderBirthNacionalityPerson() {
        /** @type meta4.exports.widget.Expander */
        _expanderNacionalityPerson = _utils.getExpanderVisible(_expander.BIRTH, meta4.widget.translate.getTranslate('natioperson'), null, _tab.getId());
        if (_expanderNacionalityPerson) {
            _utils.fillListPosEmpMof();
            var args = {
                expander: _expanderNacionalityPerson,
                id: 'formNacionalityPerson',
                idTable: 'STD_HR_NATIONALITY',
                empModDef: _empModDef,
                prevFn: _getFormNacionalityPerson,
                that: this
            };
            //Como es especial (multiRecord) hay que hacerlo asi
            if (_utils.listPosEmpModByTable && _utils.listPosEmpModByTable.STD_HR_NATIONALITY) { //hay modificacion de nacionalidad
                args.existEmpMod = true;
                _utils.paintEmpMod(args);
            } else { //Se pinta como siempre
                args.idForm = 'formNacionalityPerson';
                _expanderNacionalityPerson.addChild(_getFormNacionalityPerson(args));
            }
        }
        return _expanderNacionalityPerson;
    }

    /**
     * Crea el objeto fomulario que contendra los campos de datos basicos de la persona
     * @argument {Object} args - objeto con la informacion de las modificaciones del empleado
     * @returns {meta4.exports.widget.Form}_formPerson
     */
    function _getFormBasicPerson(args) {
        var nodePerson = null;
        //En funcion de si vamos por la ficha o por cambios guiados
        if (args.dataEmpMod) { //Usamos los datos del canal copy
            _utils.currentDataNode = args.dataEmpMod.t3Person.nodePerson.node;
            nodePerson = args.dataEmpMod.t3Person.nodePerson.node;
            _utils.objT3 = _utils.data.t3Person.t3;
        } else {
            _utils.currentDataNode = _utils.data.t3Person.nodePerson.node;
            nodePerson = _utils.data.t3Person.nodePerson.node;
        }

        _formPerson = _getFormToSection(args.idForm, nodePerson.getId(), null, nodePerson.getObject());
        if (nodePerson.count() > 0 && nodePerson.getCurrent() > -1) {
            //Tratamiento
            var listSaludationFormPerson = _getList('STD_ID_SALUTATION');
            if (_utils.notIsNullUndefined(listSaludationFormPerson)) {
                listSaludationFormPerson = _utils.setOptionsList(listSaludationFormPerson, [{
                        'itemQBF': 'STD_ID_SALUTATION',
                        'item': 'STD_ID_SALUTATION'
                    }]);
            }
            _formPerson.addChild(listSaludationFormPerson);

            var multiDataSurPerson = new meta4.exports.widget.MultipleItem();
            multiDataSurPerson.setId('PER_STD_N_FAMILY_NAME_1_PLCO_SURNAME_2_STD_N_FIRST_NAME');
            //Primer apellido
            multiDataSurPerson.addChild(_utils.getInput('STD_N_FAMILY_NAME_1'));
            //Segundo apellido
            multiDataSurPerson.addChild(_utils.getInput('PLCO_SURNAME_2'));
            //Nombre
            multiDataSurPerson.addChild(_utils.getInput('STD_N_FIRST_NAME'));
            _formPerson.addChild(multiDataSurPerson);

            var multiDataNamesFamMPerson = new meta4.exports.widget.MultipleItem();
            multiDataNamesFamMPerson.setId('PER_STD_N_USUAL_NAME_SUK_OTHER_FORENAMES_STD_N_MAIDEN_NAME');
            //Nombre fammiliar
            multiDataNamesFamMPerson.addChild(_utils.getInput('STD_N_USUAL_NAME'));
            multiDataNamesFamMPerson.addChild(_utils.getInput('SUK_OTHER_FORENAMES'));
            //Apellido de soltera
            multiDataNamesFamMPerson.addChild(_utils.getInput('STD_N_MAIDEN_NAME'));
            _formPerson.addChild(multiDataNamesFamMPerson);

            //Nombre alfabeto nativo
            _formPerson.addChild(_utils.getInput('PLCO_GB_NAME_UNICODE'));
            //Sexo
            var listGenderFormPerson = _getList('STD_ID_GENDER');
            if (_utils.notIsNullUndefined(listGenderFormPerson)) {
                listGenderFormPerson = _utils.setOptionsList(listGenderFormPerson, [{
                        'itemQBF': 'STD_ID_GENDER',
                        'item': 'STD_ID_GENDER'
                    }]);
            }
            _formPerson.addChild(listGenderFormPerson);

            //Nacimiento
            _getFormBirthPerson(args.idForm, nodePerson);

            //Solo para modificaciones
            if (args.dataEmpMod) {
                //Veterano sólo para modificaciones
                var listVeteranFormPerson = _getList('SUS_ID_VETERAN_WHERE');
                if (_utils.notIsNullUndefined(listVeteranFormPerson)) {
                    listVeteranFormPerson = _utils.setOptionsList(listVeteranFormPerson, [{
                            'itemQBF': 'SUS_ID_VETERAN_WHERE',
                            'item': 'SUS_ID_VETERAN_WHERE'
                        }]);
                }
                _formPerson.addChild(listVeteranFormPerson);
                //Grupo sanguineo sólo para modificaciones
                var listBloodFormPerson = _getList('PLCO_ID_BLOOD_GROUP');
                if (_utils.notIsNullUndefined(listBloodFormPerson)) {
                    listBloodFormPerson = _utils.setOptionsList(listBloodFormPerson, [{
                            'itemQBF': 'PLCO_ID_BLOOD_GROUP',
                            'item': 'PLCO_ID_BLOOD_GROUP'
                        }]);
                }
                _formPerson.addChild(listBloodFormPerson);
                //Raza sólo para modificaciones
                var listEthnicityFormPerson = _getList('SUS_ID_ETHNICITY');
                if (_utils.notIsNullUndefined(listEthnicityFormPerson)) {
                    listEthnicityFormPerson = _utils.setOptionsList(listEthnicityFormPerson, [{
                            'itemQBF': 'SUS_ID_ETHNICITY',
                            'item': 'SUS_ID_ETHNICITY'
                        }]);
                }
                _formPerson.addChild(listEthnicityFormPerson);
                //Religion sólo para modificaciones
                var listReligionFormPerson = _getList('PLCO_ID_RELIGION');
                if (_utils.notIsNullUndefined(listReligionFormPerson)) {
                    listReligionFormPerson = _utils.setOptionsList(listReligionFormPerson, [{
                            'itemQBF': 'PLCO_ID_RELIGION',
                            'item': 'PLCO_ID_RELIGION'
                        }]);
                }
                _formPerson.addChild(listReligionFormPerson);
                //Usuario de red
                _formPerson.addChild(_utils.getInput('PLCO_NETW_USERNAME'));
                //Id externo
                _formPerson.addChild(_utils.getInput('PLCO_HIST_LEGACY_ID'));
            }
            _formPerson.setValidations(_utils.validationForms);
            _utils.validationForms = [];
        }
        return _formPerson;
    }

    /**
     * Crea el objeto expander que contendra los datos basicos de la persona
     * @returns {meta4.exports.widget.Expander} _getExpanderBasicData
     */
    function _getExpanderBasicData() {
        /** @type meta4.exports.widget.Expander */
        _expanderBasicPerson = _utils.getExpanderVisible(_expander.PERSONAL_INFO, meta4.widget.translate.getTranslate('expbasicperson'), true, _tab.getId());
        if (_expanderBasicPerson) {
            var args = {
                expander: _expanderBasicPerson,
                id: 'formBasicPerson',
                idTable: 'STD_PERSON',
                empModDef: _empModDef,
                prevFn: _getFormBasicPerson,
                that: this
            };
            _utils.paintEmpMod(args);
        }
        return _expanderBasicPerson;
    }
    /**
     * Lee los datos del canal y sus nodos
     */
    function _getT3NodesData() {
        _utils.objT3 = _utils.data.t3Person.t3;
        _utils.nodeConfigFields = _utils.data.t3Person.nodeConfigFields.node;
        _utils.loadAllConfig(); //FJPP
        _utils.processVisibility(_utils.activeTab);
    }

    /**
     * Crea el contenedor con el porcentaje del dosier
     * @returns {meta4.exports.widget.Expander} _generateBlockPercentageDossier
     */
    function _generateBlockPercentageDossier() {
        var section = new meta4.exports.widget.Expander();
        section.setId('containerPercentageDossier');
        section.setClass('flexGrow');
        section.setVoid(true);
        section.setEraseEmpty(false);
        return section;
    }

    /**
     * Carga datos del porcentaje del dosier
     * @returns } loadPercentageDossier
     */
    function loadPercentageDossier() {
        var employeeDossierProgression = new Element('div', {
            'id': 'employeeDossierProgression'
        });
        var dossierProgressionLabel = new Element('div', {
            'id': 'dossierProgressionLabel'
        });

        var dossierProgressionBar = new Element('div', {
            'id': 'dossierProgressionBar'
        });

        var dossierProgressionPercentage = new Element('div', {
            'id': 'dossierProgressionPercentage'
        });
        employeeDossierProgression.adopt(dossierProgressionLabel, dossierProgressionBar, dossierProgressionPercentage);
        var employeeLabel = new Element('label', {
            'id': 'employeeLabel',
            'text': meta4.widget.translate.getTranslate('labelProgressBar')

        });
        dossierProgressionLabel.grab(employeeLabel);
        //var percentageValue = _utils.data.t3Person.nodePerson.node.getValue('PLCO_AVANCEMENT_PERCENTAGE');
        var percentageValue = 22;
        var progressBar = null;
        var percentageLabel = new Element('label', {
            'id': 'percentageLabel',
            'text': percentageValue + ' %'
        });
        dossierProgressionPercentage.grab(percentageLabel);
        var optionsPBar = {
            maximun: 100,
            step: percentageValue,
            editable: false,
            optionClass: ''
        };
        progressBar = new meta4.widget.ProgressBar(dossierProgressionBar, optionsPBar);
        progressBar._text.setStyle('display', 'none');
        var containerPercentage = document.getElementById('containercontainerPercentageDossier');
        if (containerPercentage) {
            containerPercentage.adopt(employeeDossierProgression);
        }
    }

    /**
     * Crea el objeto persona que contendra los datos de la persona
     * @returns {meta4.exports.widget.Expander} _tab
     */
    function _generateBlock() {
        //Añade campos buffer al objeto de datos para los cambios, tiene que ir antes de _getT3NodesData  
        _utils.setDataObjBufferToChanges(_idTab, _getBufferFormEmpMod, _expander.ADDITIONAL_PERSONAL_DATA, _empModDef, _data);
        _getT3NodesData(); //Lee los datos del canal y sus nodos
        _utils.positionAllNodes(_data);
        var container = _tab.getContainer();
        var listExpander = [];
        _blockPerson = null;
        _blockPerson = _utils.getBlockOtherItems('blockPersonal', _tab);
        _blockPerson.addChild(_generateBlockPercentageDossier());
        _utils.blockPerson = _blockPerson;
        var expanderBuffer = null;
        var listSections = [_expander.PERSONAL_INFO, _expander.BIRTH, _expander.OTHER_DATA, _expander.ADDRESS, _expander.CONTACTS, _expander.CONNECTION_DATA,
            _expander.OTH_CONT_F_PERSON, _expander.BANK_DATA, _expander.HR_CONTACT_PERSON, _expander.OTHER_DOCUMENTS_PERSON, _expander.MANAGE_DOCUMENT,
            _expander.DEPENDENTS_PERSON, _expander.expanderBufferPersonal
        ];

        //Creamos todas la secciones
        listSections.forEach(function (obj) {
            switch (obj) {
                case _expander.PERSONAL_INFO:
                    //datos basicos
                    var expanderBasic = _getExpanderBasicData();
                    _blockPerson.addChild(expanderBasic);
                    listExpander.push(expanderBasic);
                    break;
                case _expander.BIRTH:
                    //Nacionalidad
                    var expanderNat = _getExpanderBirthNacionalityPerson();
                    _blockPerson.addChild(expanderNat);
                    listExpander.push(expanderNat);
                    break;
                case _expander.OTHER_DATA:
                    //Otros datos
                    var expanderOtherData = _getExpanderOtherDataPerson();
                    _blockPerson.addChild(expanderOtherData);
                    listExpander.push(expanderOtherData);
                    break;
                case _expander.ADDRESS:
                    //Direccion
                    var expanderAddr = _getExpanderAddressPerson();
                    _blockPerson.addChild(expanderAddr);
                    listExpander.push(expanderAddr);
                    break;
                case _expander.CONTACTS:
                    //Datos de contacto
                    var expanderContact = _getExpanderContactPerson();
                    _blockPerson.addChild(expanderContact);
                    listExpander.push(expanderContact);
                    break;
                case _expander.CONNECTION_DATA:
                    //Datos de conexion
                    var expanderConnect = _getExpanderConnectionDataPerson();
                    _blockPerson.addChild(expanderConnect);
                    listExpander.push(expanderConnect);
                    break;
                case _expander.OTH_CONT_F_PERSON:
                    //Otras formas de contacto
                    var expanderOthContact = _getExpanderOthContPerson();
                    _blockPerson.addChild(expanderOthContact);
                    listExpander.push(expanderOthContact);
                    break;
                case _expander.BANK_DATA:
                    //Datos bancarios
                    var expanderBank = _getExpandeBankPerson();
                    _blockPerson.addChild(expanderBank);
                    listExpander.push(expanderBank);
                    break;
                case _expander.HR_CONTACT_PERSON:
                    //Contactos de emergencia
                    var expanderHrContact = _getExpandeHrContactPerson();
                    _blockPerson.addChild(expanderHrContact);
                    listExpander.push(expanderHrContact);
                    break;
                case _expander.OTHER_DOCUMENTS_PERSON:
                    //Documentos identificativos
                    var expanderOthDoc = _getExpandeOtherDocPerson();
                    _blockPerson.addChild(expanderOthDoc);
                    listExpander.push(expanderOthDoc);
                    break;
                case _expander.MANAGE_DOCUMENT:
                    //Documentos
                    var expanderDoc = _getExpanderDocsPerson();
                    _blockPerson.addChild(expanderDoc);
                    listExpander.push(expanderDoc);
                    break;
                case _expander.DEPENDENTS_PERSON:
                    //Dependientes
                    var expanderFam = _getExpanderFamilyPerson();
                    _blockPerson.addChild(expanderFam);
                    listExpander.push(expanderFam);
                    break;
                case _expander.expanderBufferPersonal:
                    //Campos buffer
                    expanderBuffer = _utils.getExpander(_expander.expanderBufferPersonal, '', true);
                    if (expanderBuffer) {
                        expanderBuffer.setEraseEmpty(false);
                        expanderBuffer.setVoid(true);
                        _blockPerson.addChild(expanderBuffer);
                    }
                    break;
            }
        });
        //_blockPerson.addChild(_getExpandeCompInfPerson()); //De momento no se pinta

        expanderBuffer = _utils.getExpanderEmpty(_expander.expanderBufferPersonal, '', true);
        _blockPerson.addChild(expanderBuffer);

        _tab.addChild(_blockPerson);
        //loadPercentageDossier();
        var afterRun = function () {
            _getExpanderBuffInfo(expanderBuffer);
            setDisplayPersonalExpanders(listExpander);
            //_utils.setDisplayViewAll(_tab);
            _utils.toggleOtherItems(_tab.getId());
            _utils.checkFormsUpdatable();
            _utils.refreshFormAfterPaint(_listObjToRefreshAfterPaint);
        }.bind(this);
        _blockPerson.setSyncExecution(true);
        _blockPerson.run(container, afterRun);
        return _blockPerson;
    }

    function setDisplayPersonalExpanders(listExpander) {
        for (var i = 0; i < listExpander.length; i++) {
            _utils.setDisplayExpander(_tab, listExpander[i]);
        }
    }

    /**
     * Funcion publica para pintar los datos
     */
    function _paintData() {
        //_tab.removeChild('Person');
        _expanderBankPerson = null;
        _blockPerson.remove();
        _generateBlock();
    }

    /**
     * Funcion publica para devolver los datos de carga
     */
    function _getData() {
        return _data;
    }

    /**
     * Funcion publica para devolver los datos de carga de las modificaciones simples
     */
    function _getPaintForms() {
        return _empModDef;
    }

    /**
     * Funcion publica para devolver los formularios para las modificaciones simples asistidas
     * @param {Object} opt
     * @returns {meta4.exports.widget.Form}
     */
    function _getForm(opt) {
        var obj = _empModDef[opt.idTable];
        obj.data = _data[obj._channel][obj._node];
        var form = _utils.getFormAssistant(obj, opt);
        return form;
    }

    /**
     * Constructor de la pestaña
     * @param {Object} utils
     * @param {Object} tab
     * @param {Object} callBack - Ejecutar en caso de ser una mod. de empleado
     * @returns {meta4.exports.widget.Block}
     */
    function _init(utils, tab, callBack) {
        var res = null;
        if (utils.widgetToTab === _idTab || !utils.widgetToTab) {
            _utils = utils;
            _tab = tab;
            utils.invertData(_data, utils.dataDefInverted);
            complementary = meta4.pa.employeeInformation.ComplementaryFields;
            complementary.init(_utils);
            if (callBack) {
                _getT3NodesData();
                callBack();
            } else {
                /*
                 //Esto es porque ahora cargamos todos los canales para ver su configuracion y se nos quedan los amigos de los documentos mal
                 if(_utils.data.t3Documents && _utils.data.t3Documents.t3 && !_utils.data.t3Documents.nodeDocs && _utils.data.t3Documents.refresh !== false){
                 delete _utils.data.t3Documents;
                 } else {
                 if(_utils.data.t3Documents && _utils.data.t3Documents.refresh){ //FJPP
                 delete _utils.data.t3Documents.refresh;
                 }
                 }
                 */
                utils.loadDataOnDemand(_data, _generateBlock, _idTab);
            }
            res = true;
        }
        return res;
    }

    function getExpander(){
        return {};
    }

    function _mock_utils(mock){
        _utils = mock;
    }
    
    var __test__only__ = {};
    __test__only__._mock_utils = _mock_utils;
    __test__only__._getFormToSection = _getFormToSection;
    __test__only__._getFormDocsPerson = _getFormDocsPerson;

    return {
        init: _init,
        paintData: _paintData,
        getData: _getData,
        getForm: _getForm,
        getPaintForms: _getPaintForms,
        __test__only__: __test__only__
    };
}();
