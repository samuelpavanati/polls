import { FastifyInstance } from "fastify";
import z from "zod";
import { voting } from "../../utils/voting-pub-sub";

export async function pollResults(app: FastifyInstance) {
  app.get('/polls/:pollId/results', { websocket: true }, (connection, request) => {
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    })

    const { pollId } = getPollParams.parse(request.params)

    voting.subscribe(pollId, (message) => {
      connection.socket.send(JSON.stringify(message))
    })

    // connection.socket.on('message', (message: string) => {
    //   connection.socket.send('you send: ' + message)
    // })

    // setInterval(() => {
    //   connection.socket.send('oi')
    // }, 500)
    
  })

}