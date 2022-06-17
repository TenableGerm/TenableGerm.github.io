import { Component, Input, OnInit } from '@angular/core';
import { PastProject } from 'src/app/Objects/PastProject';
import { PastProjectsComponent } from 'src/app/past-projects/past-projects.component';

@Component({
  selector: 'app-generic-dropdown-panel',
  templateUrl: './generic-dropdown-panel.component.html',
  styleUrls: ['./generic-dropdown-panel.component.scss']
})
export class GenericDropdownPanelComponent implements OnInit {


  @Input() project: PastProject; 

  display: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(!this.project){
      this.project = {
        projectDescription: "Null Project",
        projectTitle: "Null Project",
      } as PastProject;
    }
  }

  onClick(){
    this.display = !this.display;
  }

  getImageDescription(i:number): String {
    return this.project.imageDescriptions ? (this.project.imageDescriptions[i] ?  this.project.imageDescriptions[i] : "No Description")  : "No Description";
  }

  public loadScript(url: String, id: String) {
    const body = document.getElementById(id as string);
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url as string;
    script.async = false;
    script.defer = true;
    body ? body.appendChild(script): null;
  }

}
