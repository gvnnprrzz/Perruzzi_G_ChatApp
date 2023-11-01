export default {
    name: 'TheChatMessageComponent',
    props: ['message'],

    template: `
    <article class="chat-messages" :class="{ 'other-messages' : matchedID }">
        <h2>{{ message.name }} says:</h2>
        <p>{{ message.content }}</p>
        <p class="timestamp">{{ message.timestamp }}</p>
    </article>
    `,

    data() {
        return {
            message: 'hello from the template',
            matchedID: this.$parent.socketID == this.message.id
        }
    }
}
