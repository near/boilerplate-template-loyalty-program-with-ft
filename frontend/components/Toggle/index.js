const Toggle = ({ text, checked, onChange }) => {
  return (
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        id="flexSwitchCheckChecked"
        checked={checked}
        onChange={(e) => onChange(e)}
      />
      <label class="form-check-label" for="flexSwitchCheckChecked">
        {text}
      </label>
    </div>
  );
};

export default Toggle;
