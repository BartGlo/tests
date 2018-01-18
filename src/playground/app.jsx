class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
  }
  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options){
        this.setState(() => ({options}));
      }
    } catch(e) {
      console.log(e);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  componentWillUnmount() {
    console.log('component will unmount!');
  }
  handleDeleteOptions() {
    this.setState(() => ({options: []}));
  }
  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  }
  handlePick() {
    const min = Math.ceil(0);
    const max = Math.floor(this.state.options.length-1);
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    alert(`Do: '${this.state.options[random]}'`);
  }
  handleAddOption(option) {
    if(!option){
      return 'Enter valid value to add option';
    } else if(this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }
    this.setState((prevState) => ({options: [...prevState.options, option]}));
  }
  render() {
    const subtitle = 'Put your life in the hands of a computer';
    return (
      <div>
        <Header subtitle={subtitle} />
        <User name={'Bart'} age={23}/>
        <Action hasOptions={this.state.options.length} handlePick={this.handlePick}/>
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption}/>
      </div>
    );
  }
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
}

Header.defaultProps = {
  title: 'Indecision'
}

const User = (props) => {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}

const Action = (props) => {
  return (
    <div>
      <button onClick={props.handlePick} disabled={!props.hasOptions}>What should I do?</button>
    </div>
  );
}

const Options = (props) => {
  return (
    <div>
      {/*  THIS IS MORE EXPENSIVE, BETTER TO WRITE IT IN A CONSTRUCTOR - SEE ABOVE*/}
      {/* <button onClick={this.handleRemoveAll.bind(this)}>Remove All</button> */}
      <button onClick={props.handleDeleteOptions} disabled={!props.options.length}>Remove All</button>
      {props.options.length === 0 && <p>Please add an option to  get started!</p>}
      {
        props.options.map((option) =>
        <Option
          key={option}
          optionText={option}
          handleDeleteOption={props.handleDeleteOption}
        />
      )
    }
  </div>
);
}

const Option = (props) => {
  return (
    <div>
      <h4>Option: {props.optionText}</h4>
      <button
        onClick={() => props.handleDeleteOption(props.optionText)}
        >
          remove
        </button>
      </div>
    );
  }

  class AddOption extends React.Component {
    constructor(props){
      super(props);
      this.handleAddOption = this.handleAddOption.bind(this);

      this.state = {
        error: ''
      }
    }
    handleAddOption(e) {
      e.preventDefault();
      const option = e.target.elements.option.value.trim();
      const error = this.props.handleAddOption(option);
      this.setState(() => ({error}));

      if(!error){
        e.target.elements.option.value = '';
      }
    }
    render() {
      return (
        <div>
          <form onSubmit={this.handleAddOption}>
            <input type='text' name='option'></input>
            <button>Add Option</button>
            <p>{this.state.error}</p>
          </form>
        </div>
      );
    }
  }

  ReactDOM.render(<IndecisionApp />, document.getElementById('app'));