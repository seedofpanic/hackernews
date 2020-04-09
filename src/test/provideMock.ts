import {Type} from "@angular/core";
import {instance} from "ts-mockito";

export function provideMock<T>(value: T, token: Type<T>) {
  return {provide: token, useValue: instance(value)};
}
