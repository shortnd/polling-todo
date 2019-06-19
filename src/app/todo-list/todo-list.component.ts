import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { interval, empty } from 'rxjs';
import { startWith, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[];
  private error = false;

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    interval(1000)
      .pipe(
        startWith(0),
        switchMap(() => this.todoService.getTodos())
      )
      .pipe(catchError(() => {
        return empty();
      }))
      .subscribe(todos => this.todos = todos ? todos : empty());
  }

}
