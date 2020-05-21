var meta4 = meta4 || {};
meta4.automationLegacy = meta4.automationLegacy || {};

meta4.automationLegacy.employee = (function () {

    var _m4Object = null;
    var _empDetail = null;

    function _setM4Object(m4object){
        return _m4Object = m4object;
    }

    function _getEmpDetail(){
        return _empDetail;
    }

    function _setEmpDetail(idValue, nameValue, ageValue) {
      _empDetail = { id: idValue, name: nameValue, age: ageValue };
    }

    function _printEmployeeDetail(){
        var divEmpDetail = document.createElement("div");
        var labelEmpId = document.createTextNode(_getEmpDetail().id);
        var labelEmpName = document.createTextNode(_getEmpDetail().name);
        var labelEmpAge = document.createTextNode(_getEmpDetail().age);

        divEmpDetail.appendChild(labelEmpId);
        divEmpDetail.appendChild(labelEmpName);
        divEmpDetail.appendChild(labelEmpAge); 
    }

    function _onLoadEmployeeDetailSuccess(){
        var m4NodeDetail = _m4Object.getNode('MY_DETAIL_M4NODE');
        if(m4NodeDetail.count() === 0){
            throw new Error("Whoops Empty Node!");
        }
        m4NodeDetail.moveTo(0);
        var isPrivate = m4NodeDetail.getValue('PROP_IS_PRIVATE');
        if(isPrivate){
            throw new Error("Whoops is a private profile");
        }
        _setEmpDetail(
            m4NodeDetail.getValue('PROP_ID'),
            m4NodeDetail.getValue('PROP_NAME'), 
            m4NodeDetail.getValue('PROP_AGE')
        );

        _printEmployeeDetail();

    }

    function _onInitSuccess(){
        var node = m4Object.getNode('INI_M4NODE');
        var options = {
            'elements' : [{
                'type' : 'help',
                'tooltip' : meta4.widget.translate.getTranslate('helpLabel')
            }, {
                'type' : 'title',
                'text' : node.getNodeMetadata('INI_M4NODE').getProperty('Name')
            }]
        };
        new meta4.widget.titlebar('header', options);			
    }

    function loadEmployeeDetail(){
        var dateToday = new Date();
        var m4Request = new meta4.M4Request(_m4Object, 'MY_DETAIL_M4NODE', 'LOAD_DETAIL', [dateToday]);
        meta4.data.execute(m4Request, _onLoadEmployeeDetailSuccess);
    }

    function init(){
        _setM4Object(new meta4.M4Object("PLCO_MY_M4O", "PLCO_MY_M4O"));
        meta4.widget.utils.closingChecker(this.m4object);

        $(document.head).getElement('title').set('text', this.m4object.getObjectMetadata().getProperty('Name'));

        var request = new meta4.M4Request(_m4Object, 'INI_M4NODE', 'INITIALIZE', null);
        meta4.data.execute(request, _onInitSuccess);

        $('main').setStyle('visibility', 'visible');
    }

    /** test-code */

    var __testonly__ = {};
    __testonly__._onLoadEmployeeDetailSuccess = _onLoadEmployeeDetailSuccess
    __testonly__._setM4Object = _setM4Object
    __testonly__._getEmpDetail = _getEmpDetail


    /** end-test-code */

    return {
        __testonly__ : __testonly__,
        loadEmployeeDetail : loadEmployeeDetail,
        init: init
    };

}());



