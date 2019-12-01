const collections = ['Board', 'Project', 'Tag', 'Task', 'Team'];

function getEntriesFor(collection) {
  var Entity = Parse.Object.extend(collection);
  var query = new Parse.Query(Entity);
  return query.limit(999).find();
}

Parse.Cloud.define('reset', async function(req, res) {
  for (const collection of collections) {
    await Parse.Object.destroyAll(await getEntriesFor(collection));
  }

  return true;
});
