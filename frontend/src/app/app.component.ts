import { Component,OnInit } from '@angular/core';
import{Post} from 'src/app/model/post';
import { ApiService } from 'src/app/shared/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  post:Post={
    _id:'',
   title:'',
   content:'',
   username:'' 
  }
  title:string='';
  content:string='';
  username:string='';

  allPosts:Post[] =[];
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.title='';
    this.content='';
    this.username='';
    this.getAllPost();
      
  }
  //get all data subscribe
getAllPost(){
  this.api.getAllPosts().subscribe(res=>{
    this.allPosts=res;
  },err=>{console.log(err)})

}
//get post by ID subscribe
getPostbyId(post:Post) 
{
  this.api.getPostbyID(post._id).subscribe(res=>{
    post=res;
  },err=>{console.log(err)})

}
//delete data by Id  subscribe
deletePostData(post:Post)
{
  if(window.confirm('Are you sure you want to delete this data id:'+post._id)){
   this.api.deletePost(post._id).subscribe(res=>{
    this.allPosts=[];
    this.getAllPost();
  },err=>{console.log(err)})


}
}
//create post data subscribe
createPostData(){
  this.post.title=this.title;
  this.post.content=this.content;
  this.post.username=this.username;
  this.api.createPost(this.post).subscribe(res=>{
    this.allPosts=[];
    this.ngOnInit();
  },err=>{
    console.log(err)
  })

}
//edit data by Id

editPost(post:Post)
{
  this.getPostbyId(post);
  this.title=post.title;
  this.content=post.content;
  this.username= post.username;
}
//updatePost()
updatePost(){
if(this.title==''||this.content == ''||this.username==''){  
  alert('Please fill all the values on fields');
  return ;
}
this.post.title=this.title;
this.post.content=this.content;
this.post.username=this.username;
this.api.updatePost(this.post).subscribe(res=>{
  this.ngOnInit();
},err=>{
  console.log(err);
})

}
}
