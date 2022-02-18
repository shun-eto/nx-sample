## Service

### Command

- Command クラスで Validate をある程度吸収する

  - ex.

    ```ts
    class Command {
      readonly email: string;

      constructor(command: Command) {
        if (!command.email) throw new Error();
        if (!valid(command.email)) throw new Error();

        Object.assign(this, command);
      }
    }
    ```
