export interface Scene {
   start: (context: any) => void
   stop: () => void
}

export class SceneManager {
   private currentState: string = ""
   private states: Record<string, Scene> = {}

   register = (name: string, state: Scene) => {
      this.states[name] = state
   }

   firstState = (state: string, context: any = {}) => {
      this.currentState = state
      this.states[this.currentState].start(context)
   }

   transitionTo = (state: string, context: any = {}) => {
      this.states[this.currentState].stop()
      this.currentState = state
      this.states[this.currentState].start(context)
   }
}
