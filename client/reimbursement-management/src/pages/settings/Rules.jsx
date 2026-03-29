import "./settings.css";

export default function Rules() {
  return (
    <div className="settings-container">
      <h2 className="settings-title">Approval Rules</h2>

      <div className="rule-box">
        <p>Rule Type: Percentage</p>
        <p>Condition: 60% approval required</p>
      </div>

      <div className="rule-box">
        <p>Rule Type: Specific Approver</p>
        <p>Condition: CFO approval required</p>
      </div>
    </div>
  );
}