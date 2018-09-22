const EventBus = new Vue();

const inputComponent = {
  template: `
    <input 
      class="input is-small" 
      type="text" 
      :placeholder="placeholder"
      v-model="input"
      @keyup.enter="monitorEnterKey"/>
    `,
    props: ['placeholder'],
    data: () => ({
      input: ''
    }),
    methods: {
      monitorEnterKey() {
        EventBus.$emit('add-note', {
          note: this.input,
          timestamp: new Date().toLocaleString(),
        });
        this.input = '';
      }
    },
};

const noteCountComponent = {
  template: `
    <div class="column has-text-centered">
      Note count: <strong>{{ noteCount }}</strong>
    </div>
    `,
    data: () => ({
      noteCount: 0
    }),
    created() {
      EventBus.$on('add-note', 
        event => this.noteCount++
      );
    },
};

new Vue({
  el: '#app',
  data: {
    notes: [],
    timestamps: [],
    placeholder: 'Enter a note'
  },
  components: {
    'input-component': inputComponent,
    'note-count-component': noteCountComponent,
  },
  methods: {
    addNote(event) {
      this.notes.push(event.note);
      this.timestamps.push(event.timestamp);
    },
  },
  created() {
    EventBus.$on('add-note', 
      event => this.addNote(event)
    );
  },
});
