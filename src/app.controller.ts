import { Controller } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}
}

/* 
`# Zadání BE - NestJS

Struktura aplikace:

- `AppModule`: hlavní modul, ze kterého se spouští aplikace, importuje `DataModule`
    - `AppController`: HTTP controller, volá `DataService`
- `DataModule`: modul pro správu dat
    - `DataService`: služba, která simuluje práci s databází

`

**Zvolil jsem dle mého názoru lepší strukturu aplikace.**

- `AppModule`: hlavní modul, ze kterého se spouští aplikace, importuje `CustomersModule`
    - `CustomersController`: HTTP controller, volá `CustomersService`
-`CustomersModule`: modul pro správu zákazníků
    - `CustomersService`: služba, která pracuje s databází
 */
