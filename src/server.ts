import fastify from "fastify";
import cors from "@fastify/cors";
import { drivers, teams } from "./daddo";

interface DriversParam {
    id: string
}


const server = fastify({ logger: true})

// Habilita CORS
server.register(cors, {
  origin: "*", // permite qualquer origem
});



server.get("/teams", async (request, response) => {
    response.type("application/json").code(200);
    return {teams};
})

server.get("/drivers", async (request, response) => {
    response.type("application/json").code(200);
    return {drivers};
})

server.get<{Params: DriversParam}>("/drivers/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find(d => d.id === id)

    if (!driver) {
        response.type("application/json").code(404);
        return {msg: "Driver not found"}
    }

    const team = teams.find(d => d.id === driver.teamId)

    if (!team) {
        response.type("application/json").code(404);
        return {msg: "Team not found"}
    }
    response.type("application/json").code(200);
    return { driver : {
        id: driver.id,
        name: driver.name,
        team: team.name
    }}

})


server.listen({
    port: 3333,
    host: "0.0.0.0"
}, () =>{
    console.log("Server init");
})