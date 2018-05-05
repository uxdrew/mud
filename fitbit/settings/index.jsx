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
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings); 