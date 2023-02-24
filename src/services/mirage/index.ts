import {
  ActiveModelSerializer,
  createServer,
  Factory,
  Model,
  Response,
} from "miragejs";

interface ITodo {
  todo: string;
  description: string;
  checked: boolean;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      todo: Model.extend<Partial<ITodo>>({}),
    },

    factories: {
      todo: Factory.extend({
        todo() {
          return "test";
        },
        description() {
          return "test description";
        },
        checked() {
          return false;
        },
      }),
    },

    seeds(server) {
      server.createList("todo", 2);
    },

    routes() {
      this.namespace= "";
      
      this.get("api/todos", function (this: any, schema, request) {
        const { todos } = this.serialize(schema.all("todo"));
        
        return new Response(200, { todos });
      });
      
      this.passthrough();
    },
  });

  return server;
}
