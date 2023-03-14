import {
  ActiveModelSerializer,
  createServer,
  Factory,
  Model,
  Response,
} from "miragejs";

interface ITodo {
  todo: string;
  checked: boolean;
};

interface IDescription {
  description: string;
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      todo: Model.extend<Partial<ITodo>>({}),
      description: Model.extend<Partial<IDescription>>({}),
    },

    factories: {
      todo: Factory.extend({
        todo() {
          return "test";
        },
        checked() {
          return true;
        },
      }),
      description: Factory.extend({
        description() {
          return "Test";
        }
      }),
    },

    seeds(server) {
      server.createList("todo", 2);
      server.createList("description", 1);
    },

    routes() {
      this.namespace= "";
      
      this.get("api/todos", function (this: any, schema, request) {
        const { todos } = this.serialize(schema.all("todo"));
        
        return new Response(200, { todos });
      });

      this.post("api/todos");

      this.patch("api/todos/:id");

      this.delete("api/todos/:id");
      
      this.passthrough();
    },
  });

  return server;
}
