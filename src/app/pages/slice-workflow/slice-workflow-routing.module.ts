import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SliceWorkflowComponent } from './slice-workflow.component';

const routes: Routes = [{ path: '', component: SliceWorkflowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SliceWorkflowRoutingModule { }
