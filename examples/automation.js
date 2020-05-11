var meta4 = meta4 || {};
meta4.automation = meta4.automation || {};

meta4.automation.employee = (function () {

    function onRequestSuccess(){
        return true;
    }

    /**
     * Carga la actividad del empleado
     * @param {meta4.M4Object} m4Object 
     */
    function loadEmployeeActivity(m4Object) {
        var m4Request = new meta4.M4Request(m4Object, 'MY_ACTIVITY_M4NODE', 'LOAD_ACTIVITY', null);
        var m4Node = m4Object.getNode('MY_ACTIVITY_M4NODE');
        var isManager = meta4.data.utils.getValue(m4Node, 'PROP_IS_MANAGER');

        if(isManager){
            var m4ObjReference = new meta4.M4Object('PLCO_MY_REFERENCE_M4O', 'PLCO_MY_REFERENCE_M4O');
            m4Request.addReference('PLCO_MY_REFERENCE', m4ObjReference);
        } 
        
        meta4.data.execute(m4Request, onRequestSuccess);	
    }

    return {
        loadEmployeeActivity : loadEmployeeActivity,
    };

}());
