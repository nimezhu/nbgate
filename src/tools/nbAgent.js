function getgenome(uri,genome) {
  return new Promise(function (resolve, reject) {
    fetch(uri, {})
      .then(function (d) {
        return d.json()
      })
      .then(function (v) {
        resolve({genome:genome,data:v})
      }).catch(function (e) {
        reject(e)
      })
  })
}

/* nbAgent: get nucleserver tracks information
 * Usage:
 * Example:
 *   var agent= nbAgent().server("/d/portal")
 *   agent().then(function(d){
 *     // handle d 
 *   }).catch(fucntion(e){
 *     // handle e
 *   })
 *
 */
function nbAgent() {
  var server
  var genomes
  var data = {}
  var inited
  var queryParas = {}
  var fetchDb = function(genome,db) {
    return new Promise(function(resolve,reject){
      console.log(server,genome,db)
      fetch(server+"/"+genome+"/"+db+"/ls?attr=1",queryParas).then(function(d){
       return d.json()})
      .then(function(d){ 
        //TODO Assign data[genome][db]=d
        data[genome][db]=d
        resolve(d) //TODO
      }).catch(function(e){
        reject(e)
      })
    })

  }
  var _get = function (resolve, reject) {
    if (inited) { // data is available
      resolve(data)
    }
    if (typeof genomes == "undefined") {
      fetch(server + "/genomes", queryParas)
        .then(function (d) {
          return d.json()
        })
        .then(function (d) {
          genomes = d
          var q1 = [];
          genomes.forEach(function (genome) {
            if (!(genome in data)) {
              data[genome]={}
            }
            q1.push(
              getgenome(server + "/" + genome + "/ls",genome) //TODO MY JSON
            )
          })
          Promise.all(q1).then(function(gdbs) {
            var q2 = [];
            gdbs.forEach(function(gdb){
              gdb.data.forEach(function(db){
                q2.push(fetchDb(gdb.genome,db.dbname))
              }
              )
            })
            Promise.all(q2).then(function(r){
              inited=true
              resolve(data)
            })
          }).catch(function(e){
            reject(e)
          })
        }).catch(function (e) {
          reject(e)
        })

    } else {

    }
  }
  var agent = function () {
    return new Promise(_get)
  }
  agent.queryParas = function (_) {
    return arguments.length ? (queryParas = _, agent) : queryParas;
  }
  agent.server = function (_) {
    return arguments.length ? (server = _, agent) : server;
  }
  agent.genomes = function (_) {
    return arguments.length ? (genomes = _, agent) : genomes;
  }
  agent.inited = function (_) {
    return arguments.length ? (inited = _, agent) : inited;
  }
  agent.data = function (_) {
    return arguments.length ? (data = _, agent) : data;
  }
  return agent
}

export default nbAgent