$(document).ready(function() {  
    console.log("** Dom is ready **");  
    // Dom is now ready, Need to initialize kendo grid  
    // Define which columns should be visible in kendo grid  
    var columnOptions = [{ 
        field:"Id",
        editable:false
    }, {
        field: "Title",  
        title: "Title",  
    }, {  
        field: "Vendor",  
        title: "Vendor",  
        //locked: true, // Ensure when locked is true it must be require to set width explicitly to each colummns  
        width: 240  
    }, {  
        field: "StartDate",  
        title: "Start Date",
        template: '#= kendo.toString(kendo.parseDate(StartDate), "MM/dd/yyyy")#',
       groupHeaderTemplate: '#= kendo.toString(value, "MM/dd/yyyy")#'
        //width: 240 // Ensure when locked is true it must be require to set width explicitly to each colummns  
    }, {  
        field: "EndDate",  
        title: "End Date",
        template: '#= kendo.toString(kendo.parseDate(EndDate), "MM/dd/yyyy")#',
        groupHeaderTemplate: '#= kendo.toString(value, "MM/dd/yyyy")#'  
        //width: 240// Ensure when locked is true it must be require to set width explicitly to each colummns  
    }, {  
        field: "FirstNotification",  
        filterable: false, //Also possible to restrict filter option for specific column  
        title: "First Notification",
        template: '#= kendo.toString(kendo.parseDate(FirstNotification), "MM/dd/yyyy")#',
        groupHeaderTemplate: '#= kendo.toString(value, "MM/dd/yyyy")#' 
    }, {  
        field: "SecondNotification",
        title: "Second Notification",
        template: '#= kendo.toString(kendo.parseDate(SecondNotification), "MM/dd/yyyy")#',
        groupHeaderTemplate: '#= kendo.toString(value, "MM/dd/yyyy")#' 
    }, {  
        field: "ThirdNotification",
        title: "Third Notification",
        template: '#= kendo.toString(kendo.parseDate(ThirdNotification), "MM/dd/yyyy")#',
        groupHeaderTemplate: '#= kendo.toString(value, "MM/dd/yyyy")#' 
    }, {  
        field: "FourthNotification", 
        title: "Fourth Notification",
        template: '#= kendo.toString(kendo.parseDate(FourthNotification), "MM/dd/yyyy")#',
        groupHeaderTemplate: '#= kendo.toString(value, "MM/dd/yyyy")#' 
        //width: 150// Ensure when locked is true it must be require to set width explicitly to each colummns  
    }];  
    // Prepare Datasource object using Web Service/Web API  
    var dataSourceOptions = {  
        type: "odata",  
        transport: {  
            read: {
              url:  "https://girdhar.sharepoint.com/sites/wiley/_vti_bin/listdata.svc/ISVendorRenewal",
              type: "GET",
              dataType:"json",
              contentType: "application/json;odata=verbose",
              headers: {
                  "accept":"application/json;odata=verbose"
              }  

            },
            
        },
         
        pageSize: 20,  
        schema: {  
            model: {  
                id: "Id",
                fields: {
                    StartDate: {type:"date"},
                    EndDate: {type:"date"},
                    FirstNotification: {type:"date"},
                    SecondNotification: {type:"date"},
                    ThirdNotification: {type:"date"},
                    FourthNotification: {type:"date"},
            
            }  
            }  
        }  
    };  
    //// Prepare Datasource object with static data  
    //Configure or activate necessary feature in grid  
    var kendoGridOption = {  
        dataSource: dataSourceOptions,  
        columns: columnOptions,  
        toolbar: [{  
            name: "cancel"  
        }, {  
            name: "excel"  
        }, {  
            name: "pdf"  
        }],  
        // toolbar: [{ name: "cancel" }, { name: "create" }, { name: "save" }, { name: "excel" }, { name: "pdf" }],  
        excel: {  
            allPages: true,  
            fileName: "Customer Details.xlsx",  
            filterable: true //Enables or disables column filtering in the Excel file  
        },  
        height: 630, //Set height so grid is displayed on visible window and scroll appears for more records  
        editable: true, // editable: "popup",  
        // groupable: true, // Customize empty message in groupable option  
        groupable: {  
            messages: {  
                empty: "Drop columns here"  
            }  
        },  
        sortable: true,  
        filterable: true,  
        resizable: true,  
        reorderable: true,  
        columnMenu: true, //This enable excel like filter menu  
        //noRecords: true, // Configure grid for no record and also possible to define custom template as well.  
        noRecords: {  
            template: "No data available on current page. Current page is: #=this.dataSource.page()#"  
        },  
        //selectable: "multiple cell",// persistSelection not working with cell selection  
        selectable: "multiple row", // persistSelection only works with row selection  
        persistSelection: true,  
        navigatable: true, // e.g. Keyboard Navigation. For info visit https://demos.telerik.com/kendo-ui/grid/keyboard-navigation  
        allowCopy: {  
            delimeter: ",",  
        },  
        pageable: {  
            refresh: true,  
            pageSizes: true,  
            buttonCount: 5,  
            pageSize: 20  
        } 
        
    };  
    // Initialize kendo grid using ID Selector  
    $("#grid").kendoGrid(kendoGridOption);  
});