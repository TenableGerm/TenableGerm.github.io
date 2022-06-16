import { Component, OnInit } from '@angular/core';
import { PastProject } from '../Objects/PastProject';

@Component({
  selector: 'app-past-projects',
  templateUrl: './past-projects.component.html',
  styleUrls: ['./past-projects.component.scss']
})
export class PastProjectsComponent implements OnInit {

  urlToAssets: string = '../../assets'

  pastProjects: Array<PastProject> = new Array<PastProject>(
    {
      projectTitle: "Various Network Socket Programming Apps",
    
      projectDescription: "Various programs that utilized TCP and UDP to create fun little communicating instances", 
  
      imagePaths: [this.urlToAssets+"/multi.gif", this.urlToAssets+"/Directory.png"],
  
      imageDescriptions: ["These applications are communicating through TCP to a host server that is "+
                          "recieving locations of the squares and then broadcasting them back to the clients allowing them to know the other's location. "+
                          "These were coded in C++ using SDL and SDL Net.",
                          
                          "This collection of screenshots shows a partial application that allowed users to request to host a game and would allow the lobby's to be password "+
                          "protected. Clients would then be able to query this list and see the names of available hosts. All communication in this app was secured using SSL. "+ 
                          "This was created using C++, OpenSSL, and MySQL C++ Connector."],
    },
    {
      projectTitle: "3D Rubik's Cube Student Project",
    
      projectDescription: "Worked with a team of two other students to create a Rubik’s cube application that simulated a Rubik’s cube in a 3D space. Utilized Three.js for the Rubik’s cube and implemented the user interface that allowed manipulation of the cube.", 
    
      videoPath: this.urlToAssets+"/Rubiks.mp4"
    },
    {
      projectTitle: "Tune Maker Student Project",
    
      projectDescription: "Worked with a team of three other students to develop a web application that allowed users to create and store a song. Implemented the frontend and user interface on this project utilizing Angular TS to create the services and components.", 
    
      videoPath: this.urlToAssets+"/TuneMaker.mp4"
    }
  );

  constructor() { }

  ngOnInit(): void {
  }

}
