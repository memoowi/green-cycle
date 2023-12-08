const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"sanctum.csrf-cookie":{"uri":"sanctum\/csrf-cookie","methods":["GET","HEAD"]},"ignition.healthCheck":{"uri":"_ignition\/health-check","methods":["GET","HEAD"]},"ignition.executeSolution":{"uri":"_ignition\/execute-solution","methods":["POST"]},"ignition.updateConfig":{"uri":"_ignition\/update-config","methods":["POST"]},"dashboard":{"uri":"dashboard","methods":["GET","HEAD"]},"profile.edit":{"uri":"profile","methods":["GET","HEAD"]},"profile.update":{"uri":"profile","methods":["PATCH"]},"profile.updatelink":{"uri":"profile2","methods":["PATCH"]},"profile.updatetype":{"uri":"profile3","methods":["PATCH"]},"profile.updatephoto":{"uri":"profile4","methods":["POST"]},"profile.destroy":{"uri":"profile","methods":["DELETE"]},"location.edit":{"uri":"location","methods":["GET","HEAD"]},"location.update":{"uri":"location\/update","methods":["PATCH"]},"register":{"uri":"register","methods":["GET","HEAD"]},"login":{"uri":"login","methods":["GET","HEAD"]},"password.request":{"uri":"forgot-password","methods":["GET","HEAD"]},"password.email":{"uri":"forgot-password","methods":["POST"]},"password.reset":{"uri":"reset-password\/{token}","methods":["GET","HEAD"],"parameters":["token"]},"password.store":{"uri":"reset-password","methods":["POST"]},"verification.notice":{"uri":"verify-email","methods":["GET","HEAD"]},"verification.verify":{"uri":"verify-email\/{id}\/{hash}","methods":["GET","HEAD"],"parameters":["id","hash"]},"verification.send":{"uri":"email\/verification-notification","methods":["POST"]},"password.confirm":{"uri":"confirm-password","methods":["GET","HEAD"]},"password.update":{"uri":"password","methods":["PUT"]},"logout":{"uri":"logout","methods":["POST"]},"admin.dashboard":{"uri":"admin","methods":["GET","HEAD"]},"admin.posts":{"uri":"admin\/posts","methods":["GET","HEAD"]},"admin.users":{"uri":"admin\/users","methods":["GET","HEAD"]},"admin.users.update":{"uri":"admin\/users\/{user}","methods":["PATCH"],"parameters":["user"]},"admin.users.removephoto":{"uri":"admin\/users\/{user}\/photo","methods":["PATCH"],"parameters":["user"]},"admin.users.ban":{"uri":"admin\/users\/{user}\/ban","methods":["PATCH"],"parameters":["user"]},"admin.items":{"uri":"admin\/items","methods":["GET","HEAD"]},"admin.items.create":{"uri":"admin\/items\/create","methods":["GET","HEAD"]},"admin.items.store":{"uri":"admin\/items","methods":["POST"]},"admin.items.update":{"uri":"admin\/items\/{item}","methods":["POST"],"parameters":["item"]},"admin.items.delete":{"uri":"admin\/items\/{item}\/delete","methods":["DELETE"],"parameters":["item"]},"admin.recycle-facilities":{"uri":"admin\/facilities","methods":["GET","HEAD"]},"admin.facilities.ban":{"uri":"admin\/facilities\/{facility}\/ban","methods":["PATCH"],"parameters":["facility"]},"admin.facilities.removePhotos":{"uri":"admin\/facilities\/{facility}\/removePhotos","methods":["PATCH"],"parameters":["facility"]},"admin.recycle-facilities.edit":{"uri":"admin\/facilities\/edit={business}","methods":["GET","HEAD"],"parameters":["business"],"bindings":{"business":"id"}},"admin.rewards":{"uri":"admin\/rewards","methods":["GET","HEAD"]},"admin.recycled-reports":{"uri":"admin\/recycled-reports","methods":["GET","HEAD"]},"business.dashboard":{"uri":"business\/dashboard","methods":["GET","HEAD"]},"business.items":{"uri":"business\/items","methods":["GET","HEAD"]},"business.items.store":{"uri":"business\/items\/store","methods":["POST"]},"business.items.delete":{"uri":"business\/items\/delete\/{businessItems}","methods":["DELETE"],"parameters":["businessItems"]},"business.profile":{"uri":"business\/profile","methods":["GET","HEAD"]},"business.profile.update":{"uri":"business\/profile\/update","methods":["POST"]},"business.setting":{"uri":"business\/setting","methods":["GET","HEAD"]},"business.setting.update":{"uri":"business\/setting\/update","methods":["PATCH"]},"business.new.create":{"uri":"business\/register","methods":["GET","HEAD"]},"business.new.":{"uri":"business\/register","methods":["POST"]}}};

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}

export { Ziggy };