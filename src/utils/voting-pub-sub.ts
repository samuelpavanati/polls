type Message = { pollOptionId: string, votes: number }
type Subcriber = (message: Message) => void

class VotingPubSub {
  private channels: Record<string, Subcriber[]> = {}

  subscribe(pollId: string, subscriber: Subcriber) {
    if (!this.channels[pollId]) {
      this.channels[pollId] = []
    }

    this.channels[pollId].push(subscriber)
  }

  publish(pollId: string, message: Message) {
    if (!this.channels[pollId]) {
      return;
    }

    for (const subscriber of this.channels[pollId]) {
      subscriber(message)
    }
  }
}

export const voting = new VotingPubSub()