/** @jsx createElement */
import { createElement } from 'elliptical'
import { Command } from 'lacona-phrases'
import { runApplescript, showNotification, callSystem } from 'lacona-api'
import {exec} from 'child_process'


const ZenefitCommands = {
  describe () {
    return (
      <repeat unique separator={<list limit={1} />}>
        <label text='action' suppressEmpty={false}>
          <list items={[{text: 'clock in', value: 'in'}, {text: 'clock out', value: 'out'}, {text: 'lunch', value: 'lunch'}, {text: 'end lunch', value: 'endlunch'}]} limit={4} strategy='fuzzy' />
        </label>
      </repeat>
    )
  }
}


export const Zenefits = {
  extends: [Command],

  execute (result) {
    const script = `do shell script "/usr/local/bin/node /usr/local/bin/zenefits ${result.zenefitsCommands}"`;
    return runApplescript({script}, function() {
      showNotification({ title: 'Zenefits', content:   `Successful ${result.zenefitsCommands}`});
    });
  },

  describe () {
    return (
      <choice limit="{1}">
        <sequence>
          <literal text="zenefits" category="action" />
          <literal text=" " />
          <ZenefitCommands id="zenefitsCommands" />
        </sequence>
      </choice>
    )
  }
}

export default [Zenefits]
