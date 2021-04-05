import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { SET_LOGIN_DATA,SET_LIST_DATA,SET_VERIFICATION_DATA ,SET_ORDER_BOX_ID,PENDINGDATA,CLEAR,SETEMAIL,UPDATEBUISNESSDETAILS,UPDATEPROFILE,SETIMAGE,SET_CLIENT_IMAGE} from '../actions/ApiData';
import AsyncStorage from '@react-native-community/async-storage';
import URL from '../../api/ApiURL';
const initialState={
    RiderId:0,
    Access:0,
    Refresh:0,
    RiderName:"",
    RiderEmail:"",
    RiderAddress:"",
    RiderPhoneNumber:"",
    RiderPackage:"",
    CompletedOrders:"",
    ProgressOrders:"",
    PendingOrders:"",
    RemainingInvoices:"",
    TotalInvoices:"",
    UsedInvoices:"",
    OrderId:"",
    PoNumber:"",
    PendingData:"",
    RiderPhone: "",
    FirstName: "",
    LastName: "",
    RiderImage:"",
    ClientImage:""

 };

const ApiData = (state = initialState, action) => {
    switch (action.type) {
        case SET_CLIENT_IMAGE:
            console.log("Client Image is Setteddddddddddddddddddddddddddddd")
         state.ClientImage=action.product;
        return state;
        case SETIMAGE:
            state.RiderImage=action.product;
           return state;
          
        case UPDATEPROFILE:
            state.FirstName = action.firstname;
            state.LastName = action.lastname;
            state.RiderPhoneNumber = action.phoneNo;
            state.RiderAddress=action.address;

            return state;
        case SETEMAIL:
      const newEmail = action.product;
      state.RiderEmail = newEmail;
      console.log(state.RiderEmail);
      return state;
        case SET_LOGIN_DATA:
            const My_Response=action.response;
            
            state.RiderId=My_Response.delivery_person;
            state.Access=My_Response.data.access;
            state.Refresh=My_Response.data.refresh;
            
            return state;
            
        case SET_LIST_DATA:
            const ListResponse=action.response;
            console.log("reducerr",ListResponse);
            state.RiderName=ListResponse.delivery_person_dashboard.delivery_person_name;
            state.RiderPackage=ListResponse.delivery_person_dashboard.delivery_person_package;
            state.CompletedOrders=ListResponse.delivery_person_dashboard.no_of_completed_orders;
            state.ProgressOrders=ListResponse.delivery_person_dashboard.no_of_in_progress_orders;
            state.PendingOrders=ListResponse.delivery_person_dashboard.no_of_pending_orders;
            state.RemainingInvoices=ListResponse.delivery_person_dashboard.remaining_invoices;
            state.TotalInvoices=ListResponse.delivery_person_dashboard.total_invoices;
            state.UsedInvoices=ListResponse.delivery_person_dashboard.used_invoices;
            state.FirstName = ListResponse.delivery_person_dashboard.delivery_person_first_name;
            state.LastName = ListResponse.delivery_person_dashboard.delivery_person_last_name;
            state.RiderPhone = ListResponse.delivery_person_dashboard.delivery_person_phone;
            state.RiderEmail = ListResponse.delivery_person_dashboard.delivery_person_user_name;
            state.RiderAddress = ListResponse.delivery_person_dashboard.delivery_person_address;

            
            return state;
            case PENDINGDATA:
                const pdata=action.response;
                
                state.PendingData=pdata;
                console.log("pdata",state.PendingData);
            return state;

       
       case CLEAR:
           const res=action.response;
           console.log("Clearrrrr")
        if(res==1){
            state.RiderId=0;
            state.Access=0;
            state.Refresh=0;
            state.RiderName="";
            state.RiderEmail="";
            state.RiderAddress="";
            state.RiderPhoneNumber="";
            state.RiderPackage="";
            state.CompletedOrders="";
            state.ProgressOrders="";
            state.PendingOrders="";
            state.RemainingInvoices="";
            state.TotalInvoices="";
            state.UsedInvoices="";
            state.OrderId="";
            state.PoNumber="";
            state.PendingData="";
            state.RiderPhone= "";
            state.FirstName= "";
            state.LastName= "";
            state.RiderImage="";
            state.ClientImage="";
        }
        return state;





        default:
        return state;
    }
}

export default ApiData
