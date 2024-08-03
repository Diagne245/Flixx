class Storage {
  static setCurrentPage = (page) => {
    localStorage.setItem('flixxCurrent', page);
  };
  static getCurrentPage = () => {
    return localStorage.getItem('flixxCurrent');
  };

  static setCurrentContentId = (contentId) => {
    localStorage.setItem('currentContentId', contentId);
  };
  static getCurrentContentId = () => {
    return localStorage.getItem('currentContentId');
  };
}

export default Storage;
