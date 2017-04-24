angular
  .module('app')
  .component('app', {
    templateUrl: 'app/main.html',
     controller: TechsController
  });

  /** @ngInject */
function TechsController($http) {
  var vm = this,dataBuff={},state="new";
  vm.commentData = {
  	username:"",
  	commenttxt:"",
  	date : new Date()
  }
  vm.data = [{
  	name:"Heading One",
  	likes:0,
  	comments:[]
  },
  {
  	name:"Heading Two",
  	likes:0,
  	comments:[]
  },
  {
  	name:"Heading Three",
  	likes:0,
  	comments:[]
  },
  {
  	name:"Heading Four",
  	likes:0,
  	comments:[]
  }
]
	// Get the modal
var modal = document.getElementById('myModal');
function openModal(){
	// When the user clicks the button, open the modal 
    modal.style.display = "block";
}
function closeModal(){

	  modal.style.display = "none";
}
//when user clicks outside the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

vm.closeModal = closeModal;
vm.comment = function(item){
dataBuff = item;
state="new"
openModal();
}

vm.do_resize = function(){
	var element = angular.element(document).find("textarea")[0];
   element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
   // console.log(vm.comment.commenttxt.length)

}
vm.save = function(){
	if(state== "new"){
		vm.commentData.date = new Date();
		 dataBuff.comments.push(vm.commentData)
		closeModal();
		vm.commentData = {
		  	username:"",
		  	commenttxt:""
		  }
		  dataBuff = {};
	}
	else{

		 var found;
		 dataBuff.comments.map(function(comment,index) { 
		 	if(comment.username == vm.commentData.username && comment.date.getTime() == vm.commentData.date.getTime())
		 		found = index;
		 });
		
		if(found >= 0)
			dataBuff.comments[found] = vm.commentData;
		console.log("cool")
		console.log(vm.data)
		closeModal();
		console.log("")
		vm.commentData = {
		  	username:"",
		  	commenttxt:""
		  }
		  dataBuff = {};
	}
 
}
vm.edit = function(item,data){
	console.log(item)
	//console.log(comment)
  dataBuff = item;
vm.commentData = data;
state="edit"
	openModal();
}

vm.delete = function(item,data){
	var found;
		 item.comments.map(function(comment,index) { 
		 	if(comment.username == data.username && comment.date.getTime() == data.date.getTime())
		 		found = index;
		 });
		
		if(found >= 0)
		item.comments.splice(found,1);
}

vm.voteUp = function(item1){

	var pos = vm.data.map(function(item){return item.name}).indexOf(item1.name);
	if(item1.likes < 10)
 		vm.data[pos].likes = vm.data[pos].likes+1;
}
vm.voteDown = function(item1){
var pos = vm.data.map(function(item){return item.name}).indexOf(item1.name);
	if(item1.likes >0)
 		vm.data[pos].likes = vm.data[pos].likes-1;
}

}

