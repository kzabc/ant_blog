import React from 'react';

import styles from './index.less';

const YTEmojiPicker: React.FC<{}> = () => {
  const editorProps = {
    className: styles.commentEditorBox,
    submitting: false,
    onSubmit: () => {
    },
    preview: true,
  };

  return (
    <div className={styles.emojiPickerBox}>

    </div>
  );
};

export default YTEmojiPicker;
