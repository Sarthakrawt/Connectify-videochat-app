const CustomTextarea = (props) => (
  <textarea
    {...props}
    className="input input-bordered"
    style={{ resize: "none", fontSize: "1rem" }}
  />
);

const CustomSendButton = ({ handleOnClick }) => (
  <button
    onClick={handleOnClick}
    className="btn btn-primary btn-sm"
    aria-label="Send message"
  >
    Send
  </button>
);

export {
    CustomSendButton,
    CustomTextarea
}
