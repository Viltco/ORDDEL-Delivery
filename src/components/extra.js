<Content>
        <View style={{marginTop:10}}>
            {loading?null:
        <FlatList
          data={data.data}
          style={{alignSelf:'center'}}
          showsVerticalScrollIndicator={false}
          // keyExtractor={item => item.index_id.toString()}
          keyExtractor={({ product_id }, index) => data.product_id}
          renderItem={({ item }) => (
              <View style={{padding:5}}> 
              <Card style={{borderRadius:25}}>
            {/* <Card style={{borderRadius:30,width:320,height:310,backgroundColor:Colors.themeColor}}>
            <View style={{flexDirection:'row'}}>

                <View style={{padding:12,marginLeft:10}}>
            <Image source={require('../../assets/icon.png')} style={{width:Platform.OS=='ios'? 50:40,height:Platform.OS=='ios'?70:60}} />

                </View>

             {/* <Entypo name="box" color='white' size={70} style={{justifyContent:'flex-start'}} /> */}
             {/* <View style={{justifyContent:'flex-end'}}> */}
             {/* <View style={{flexDirection:'column',flex:1}}>
             <Text style={{color:'white',fontSize:26,fontWeight:'bold',textAlign:'right',width:210,marginTop:10}}>{item.product_name.toUpperCase()}</Text>
            <Text style={{color:'white',fontSize:28,fontWeight:'bold',textAlign:'right',width:210,}}># {item.qty}</Text>
            </View> */}
             {/* </View> */}
            {/* </View> */}

            {/* <Text style={styles.verticleLine}></Text> 
            <Text style={{color:'white',fontSize:16,fontWeight:'bold',textAlign:'right',paddingRight:20}}></Text>
            <Text style={{color:'white',fontSize:22,fontWeight:'bold',textAlign:'right',paddingRight:20}}>{cartItems.unit_sales_price}</Text> */}
            {/* <View style={{padding:10}}> */}
           {/* <Card style={{}}> */}
            {/* <TextInput
            style={styles.inputArea}
            placeholder="Supplier Name"
            autoCapitalize="none"
            placeholderTextColor="white"
            value={cartItems.supplier}
            required={true}
            onChangeText={(value) => {
                setSupplier(value);
            }}
            initialValue=""
          /> */}

            {/* <TextInput
            style={styles.inputArea}
            placeholder="Unit Purchased Price"
            autoCapitalize="none"
            placeholderTextColor="white"
            keyboardType='decimal-pad'
            value={cartItems.unit_purchase_price}
            required={true}
            onChangeText={(value) => setUnitPurchasedPrice(value)}
            initialValue=""
          /> */}

            {/* <TextInput
            style={styles.inputArea}
            placeholder="Profit Margin in Percentage"
            autoCapitalize="none"
            placeholderTextColor="white"
            keyboardType='decimal-pad'
            value={cartItems.profit_margin}
            required={true}
            onChangeText={(value) => {
                setProfitMargin(value);
                // console.log("ProfitMargin",profitMargin)
                // console.log(unitPurchasedPrice*item.qty+unitPurchasedPrice*item.qty/100*profitMargin,"======");
                
            }}
            initialValue=""
          /> */}
          {/* <TouchableOpacity
          style={styles.signupButton}
          activeOpacity={0.7}
          onPress={()=>{
            //setUnitSalePrice(((unitPurchasedPrice*item.qty)+(unitPurchasedPrice*item.qty/100*profitMargin))),
              dispatch(ConsolidateAction.AddConsolidateData(RiderId,item.product_id,supplier,unitPurchasedPrice,profitMargin,unitPurchasedPrice*item.qty)),
              alert(item.product_name+" Record is saved"), 
              setUnitSalePrice(unitPurchasedPrice*item.qty+unitPurchasedPrice*item.qty/100*profitMargin);
              setSupplier(""),
              setUnitPurchasedPrice(""),
              setProfitMargin(""),
              setUnitSalePrice(""),
              setCount(count+1)

            }}
        //   onPress={addCompanyInfo}
        > */}

          {/* <Text style={styles.signupButtonText}>SAVE</Text> */}
        {/* </TouchableOpacity> */} 
          
           {/* <TextInput
            style={styles.inputArea}
            placeholder="Unit Sale Price"
            autoCapitalize="none"
            placeholderTextColor="white"
            value={unitSalePrice}
            required={true}
            onChangeText={(value) => setUnitSalePrice(value)}
            initialValue=""
          /> */}
            {/* </Card> */}
        {/* </View> */}
            
            
            <TouchableOpacity
            style={{width:"75%"}}
            >
               
                <View style={{flexDirection:'row'}}>
                <View
                  style={{
                    // borderBottomWidth:1,borderBottomColor:Colors.textGreyColor,
                    padding: 10,
                    width: "100%",
                    // alignSelf: "center",
                    // alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                    
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                    //   color:Colors.darkRedColor
                    //   marginTop: "4%",
                    }}
                  >
                      
                    {item.product_name}
                  </Text>
                            
                  </View>
                <View style={{justifyContent: "flex-end",width:'30%'}}>
                      <Text style={{fontSize:20,fontWeight:'bold',color:Colors.themeColor,padding:10}}>x{item.qty}</Text>
                     {/* <Text style={{ fontSize:12,alignSelf:'flex-end', color: "white",backgroundColor:Colors.darkRedColor,borderRadius:10,padding:5,}}>
                        {item.status}
                    </Text> */}
                    </View> 
                   
               </View> 
              {/* </View> */}
              <Text style={styles.verticleLine}></Text>
              <View style={{flexDirection:'row'}}>
              <View
                    style={{
                      // width: 200,
                      padding: 10,
                      width: "100%",
                      // alignSelf: "center",
                      // alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                      
                    <Text style={{ fontSize: 16, }}>
                    Unit Price
                       {item.shipment_address}
                    </Text>
                   
                  </View> 
                  <View style={{justifyContent: "flex-end",width:'30%'}}>
                  <Text style={{fontSize:17,color:Colors.themeColor,padding:10}}>£ {item.avg_price}</Text>
                    </View>
                  
                  </View>
             
            </TouchableOpacity>
            </Card>
             {/* <Card style={{borderRadius:30,width:150,height:200,marginLeft:15,marginTop:10}}>

            </Card>  */}
            </View>
           
          )}
        />}
        {/* {loading?null:<TouchableOpacity
          style={styles.c_signupButton}
          activeOpacity={0.7}
          onPress={OnSubmit}
          >

          <Text style={styles.c_signupButtonText}> SUBMIT</Text>
        </TouchableOpacity>} */}
        </View>
        
        </Content> 