function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Müd Settings</Text>}>
        <Button
          settingsKey="moodPromptButton"
          label="Prompt for Mood Now!"
          onClick= { () => { 
            console.log("Mood Prompt Clicked!"); 
            props.settingsStorage.setItem('moodPrompt', 'true'); 
          } }
        />
        <Select
          label={'Prompt for Mood Every'}
          settingsKey="moodPromptPeriod"
          options={[
            {name:"Every Half Hour", value:.5},
            {name:"Every Hour", value:1},
            {name:"Every Two Hours", value:2},
            {name:"Every Three Hours", value:3}
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings); 