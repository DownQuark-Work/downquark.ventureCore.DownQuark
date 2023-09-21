// non-component javascript
const DownQuark = (function () {
  let instance;
  // lock this when done
  function createInstance() { return {
    mediate: {
      filterSelection: (filter) => document.querySelector('dq_work-molecule-timeline').setAttribute('filter',filter)
    }
  }
}
  return { 
    singularity: function () {
      if (!instance) { instance = createInstance(); }
      return instance;
    }
  };
})();