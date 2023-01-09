let aRowColArray = [];   //A 행렬
let bRowColArray = [];  //B 행렬
let resultRowColArray = []; // 결과 행렬

$(function(){     
     $(':button').on('click',function(e){
          switch(e.target.id){
               case 'outputBtn':
               case 'randomBtn':
                    let btnNameFucOR = new btnNameFuc(e.target.id);
                    btnNameFucOR.orBtnFuc();
               break;
               case 'clearBtn':
                    let btnNameFucCL = new btnNameFuc(e.target.id);
                    btnNameFucCL.clBtnFuc();
               break;
               case 'plusBtn':
               case 'minusBtn':
                    let btnNameFucPM = new btnNameFuc(e.target.id);
                    btnNameFucPM.pmBtnFuc();
               break;
               case 'multiplyBtn' :
                    let btnNameFucMU = new btnNameFuc(e.target.id);
                    btnNameFucMU.muBtnFuc();
               break;
          }
     })
});

function btnNameFuc(anybtn){
     //출력, 랜덤
     this.orBtnFuc = function(){
          let aRowNum = $('#aRowNum').val();
          let aColumnNum = $('#aColumnNum').val();
          let bRowNum = $('#bRowNum').val();
          let bColumnNum =$('#bColumnNum').val();            
          if( !validationClick('aRowNum') || !validationClick('aColumnNum') || !validationClick('bRowNum') || !validationClick('bColumnNum')){ 
               return; 
          }
          //a 행렬 2차원 배열 생성
          aRowColArray = [];
          for(let i = 0; i<aRowNum; i++){
               let aMatrix = [];
               for(let j = 0;  j<aColumnNum; j++){
                    aMatrix.push(0);
               }
               aRowColArray.push(aMatrix);
          }

          //b 행렬 2차원 배열 생성
          bRowColArray = [];
          for(let i = 0; i<bRowNum; i++){
               let bMatrix = [];
               for(let j = 0;  j<bColumnNum; j++){
                    bMatrix.push(0);
               }
               bRowColArray.push(bMatrix);
          }

          //랜덤 버튼일 경우 2차원 배열에 랜덤 값 뿌려줌
          if(anybtn == "randomBtn"){
               for(let i =0; i < aRowColArray.length; i++){
                    for(let j =0; j<aRowColArray[i].length; j++){
                         let randomNum = Math.floor(Math.random() * 201) + -100;
                         do{
                              randomNum = Math.floor(Math.random() * 201) + -100;
                         }
                         while(randomNum==0 );
                         aRowColArray[i][j] = randomNum;
                    }
               }
     
               for(let i =0; i < bRowColArray.length; i++){
                    for(let j =0; j<bRowColArray[i].length; j++){
                         let randomNum = Math.floor(Math.random() * 201) + -100;
                         do{
                              randomNum = Math.floor(Math.random() * 201) + -100;
                         }
                         while(randomNum==0 );
                         bRowColArray[i][j] = randomNum;
                    }
               }
          }
          drawFirst();
          drawSecond();
     }

     //클리어 버튼
     this.clBtnFuc = function(){
          aRowColArray =[];
          bRowColArray =[];

          $('#aRowNum').val("");
          $('#aColumnNum').val("");
          $('#bRowNum').val("");
          $('#bColumnNum').val("");
          
          $('#aRowNum +p').html("");
          $('#aColumnNum +p').html("");
          $('#bRowNum +p').html("");
          $('#bColumnNum +p').html("");

          $("#a_matrix_input_box").html("");
          $("#b_matrix_input_box").html("");
          $("#result_matrix_input_box").html("");
          
          $(".array_area_Wrap.result").css("display","none");
          $('html, body').animate({scrollTop: '0'}, 1000);
     }
     
     //플러스, 마이너스 버튼
     this.pmBtnFuc = function(){
          if( !validationClick('aRowNum') || !validationClick('aColumnNum') || !validationClick('bRowNum') || !validationClick('bColumnNum')){ 
               return; 
          }
          if(aRowColArray.length != bRowColArray.length || aRowColArray[0].length != bRowColArray[0].length){
               popUpEvent('A와 B의',' 행렬이 같지 않음');
               return;
          }
          if(!validation(aRowColArray, 'A') || !validation(bRowColArray, 'B')) {
               return;
          }
          resultRowColArray =[];
          for(let i=0; i <aRowColArray.length; i++){
               let resultMatrix =[];
               let resultN =0;
               for(let j =0; j < aRowColArray[i].length; j++){
                    if(anybtn == "plusBtn"){
                         resultN = (aRowColArray[i][j]) + (bRowColArray[i][j]);
                    }else{
                         resultN = (aRowColArray[i][j]) - (bRowColArray[i][j]);
                    }
                    resultMatrix.push(resultN);
               }
               resultRowColArray.push(resultMatrix);
          }
          drawResult();
          scrollDisplayfuc();
     }

     //곱셈 버튼
     this.muBtnFuc = function(){
          if( !validationClick('aRowNum') || !validationClick('aColumnNum') || !validationClick('bRowNum') || !validationClick('bColumnNum')){ 
               return; 
          }
          if( aRowColArray[0].length != bRowColArray.length ){
               popUpEvent('A의 열과 B의 행이',' 같지 않음');
               return;
          }          
          if(!validation(aRowColArray, 'A') || !validation(bRowColArray, 'B')) {
               return;
          }
          
          resultRowColArray = [];
          for(let i =0; i < aRowColArray.length; i++){
               let resultMatrix = [];
               for(let j=0; j < bRowColArray[0].length; j++){
                    let resultInt = 0; 
                    for(let k=0; k < bRowColArray.length; k++){
                         resultInt += aRowColArray[i][k] * bRowColArray[k][j];
                    }
                    resultMatrix.push(resultInt);
               }
               resultRowColArray.push(resultMatrix);
          }
          drawResult();
          scrollDisplayfuc();
          $(".matrix_input_box.result > input").css("font-size","0.8vw");
     }
     //A 행 열 그리는 함수
     function drawFirst() {
          let tempStringA = "";
          for(let i =0; i < aRowColArray.length; i++){
               for(let j =0; j<aRowColArray[i].length; j++){
                    tempStringA += '<input type="text" ';
                    tempStringA += ' class="arrayInNum" ';
                    tempStringA += ' value="' + aRowColArray[i][j] + '"';
                    tempStringA += ` oninput="this.value = this.value.replace(/[^0-9]/g,'');"`
                    tempStringA += ` onKeyup="changeFirst(this, ${i}, ${j});" `; //this는 value
                    tempStringA += ' id="';
                    tempStringA += 'a_' + i + '_' +j;
                    tempStringA += '">';
               }
               tempStringA += '<br>';
          }
          $("#a_matrix_input_box").html(tempStringA);
     }
     //B 행 열 그리는 함수
     function drawSecond(){
          let tempStringB ="";
          for(let i = 0; i<bRowColArray.length; i++){
               for(let j = 0;  j<bRowColArray[i].length; j++){
                    tempStringB += '<input type="text" ';
                    tempStringB += ' class="arrayInNum" ';
                    tempStringB += ' value="' + bRowColArray[i][j] + '" ';
                    tempStringB += ` onKeyup="changeSecond(this, ${i}, ${j});" `;
                    tempStringB += ` oninput="this.value = this.value.replace(/[^0-9]/g,'');"`
                    tempStringB += ' id="';
                    tempStringB += 'b_' + i + '_' +j;
                    tempStringB += '">';
               }
               tempStringB += '<br>';
          }
          $("#b_matrix_input_box").html(tempStringB);
     }
     //결과 행 열 그리는 함수
     function drawResult(){
          console.log(aRowColArray);
          console.log(bRowColArray);
          console.log(resultRowColArray);
          
          let regexp = /\B(?=(\d{3})+(?!\d))/g; // 콤마 정규식
          let tempStringResult = "";
          for(let i = 0; i<resultRowColArray.length; i++){
               for(let j = 0;  j<resultRowColArray[i].length; j++){
                    tempStringResult += '<input type="text" class="resultInput"';
                    tempStringResult += ' value="' + resultRowColArray[i][j].toString().replace(regexp,',') + '" ';
                    tempStringResult += '" readonly>';
               }
               tempStringResult += '<br>';
          }
          $("#result_matrix_input_box").html(tempStringResult);
     }
}

// 숫자가 바뀔 때 마다 값을 A행렬 배열에 값을 넣는 함수
function changeFirst(param, i, j) {
     aRowColArray[i][j] = parseInt($(param).val());
}
function changeSecond(param, i, j) {
     bRowColArray[i][j] = parseInt($(param).val());
}

function scrollDisplayfuc(){
     $(".array_area_Wrap.result").css("display","block");
     $('html, body').animate({scrollTop: '1000'}, 800);
}

//keyup validation
$('.keyupinput').on('keyup' ,function() {
     let regExp = /^[1-9]{1}$|^10$/;
     if(!regExp.test($('#aRowNum').val())){
          $('#aRowNum +p').html('1~10까지 입력해 주세요.');
          $('#aRowNum +p').addClass('popClass');
     }else{
          $('#aRowNum +p').empty();
          $('#aRowNum +p').removeClass('popClass');
     }
     
     if(!regExp.test($('#aColumnNum').val())){
          $('#aColumnNum +p').html('1~10까지 입력해 주세요.');
          $('#aColumnNum +p').addClass('popClass');
     }else{
          $('#aColumnNum +p').empty();
          $('#aColumnNum +p').removeClass('popClass');
     }
     
     if(!regExp.test($('#bRowNum').val())){
          $('#bRowNum +p').html('1~10까지 입력해 주세요.');
          $('#bRowNum +p').addClass('popClass');
     }else{
          $('#bRowNum +p').empty();
          $('#bRowNum +p').removeClass('popClass');
     }
     
     if(!regExp.test($('#bColumnNum').val())){
          $('#bColumnNum +p').html('1~10까지 입력해 주세요.');
          $('#bColumnNum +p').addClass('popClass');
     }else{
          $('#bColumnNum +p').empty();
          $('#bColumnNum +p').removeClass('popClass');
     }
});

//버튼 유효 검사
function validationClick(rowColVal){
     let tmp_flag = true;
     let flag_Text='';
     if( $('#'+rowColVal+' +p').hasClass("popClass") ){
          flag_Text = ' 숫자 1부터 10까지 입력해 주세요.';
          popUpEvent(rowColVal,flag_Text);
          // $('#clearBtn').trigger('click');
          tmp_flag = false;
     }
     return tmp_flag;
}

// A행렬, B행렬 값 유효성
function validation(arrParam, nameText){
     let temp_AFlag = true;
     let regExp100 = /^(-100)$|^(0)$|^[-]?[1-9][0-9]?$|^100$/; //-100~100 유효성

     //행렬의 유효성
     $.each (arrParam, function (index, item) {
          $.each(arrParam[index],function(i,it){
               if(!regExp100.test(it)){ 
                    temp_AFlag = false;
               }
          });
     });

     if(temp_AFlag == false){
          let flag_Text = ' 행렬 숫자 -100~100까지 입력해 주세요.';
          popUpEvent(nameText, flag_Text)
     }
     return temp_AFlag;
}


function popUpEvent(rowColVal,flag_Text){
     if(rowColVal == 'aRowNum' || rowColVal == 'aColumnNum' || rowColVal == 'bRowNum' || rowColVal == 'bColumnNum'){
          switch(rowColVal){
               case 'aRowNum' : 
                    rowColVal = 'A의 행';
               break;
               case 'aColumnNum' :
                    rowColVal = 'A의 열';
               break;
               case 'bRowNum' :
                    rowColVal = 'B의 행';
               break;
               case 'bColumnNum' :
                    rowColVal = 'B의 열';
               break;
          }
          $('.popup_string').html(rowColVal + flag_Text);
     }else{
          $('.popup_string').html(rowColVal + flag_Text);
     }
     $('.popup_wrap').css("display","block");

}
