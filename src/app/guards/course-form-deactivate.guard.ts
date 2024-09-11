import { CanDeactivateFn } from '@angular/router';
import { CreateCourseService } from '../services/create-course.service';
import { inject } from '@angular/core';

export const courseFormDeactivateGuard: CanDeactivateFn<any> = (component, currentRoute, currentState, nextState) => {
  const createCourseService = inject(CreateCourseService);
  createCourseService.resetFormData();
  return true;
};
