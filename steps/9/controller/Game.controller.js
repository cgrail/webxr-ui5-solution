/*global THREE TWEEN*/
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"webar-test/assets/ArAssets"
], function(Controller, MessageToast, ArAssets) {
	"use strict";

	return Controller.extend("webar-test.controller.Game", {
		onInit: function() {
			this.arView = this.byId("arView");
			this.assets = new ArAssets();
		},

		shoot: function() {
			this.assets.playLaserFireSound();
			var scene = this.arView.getScene();
			var geometry = new THREE.BoxGeometry(0.03, 0.03, 2);
			var material = new THREE.MeshBasicMaterial({
				color: "red"
			});
			var laser = new THREE.Mesh(geometry, material);
			var startPosition = this.arView.getPositionWithOffset(0.5);
			startPosition.y -= 0.2;
			laser.position.copy(startPosition);
			laser.quaternion.copy(this.arView.getCamera().quaternion);
			var endPosition = this.arView.getPositionWithOffset(10);
			var tween = new TWEEN.Tween(startPosition).to(endPosition, 2000);
			tween.onUpdate(function() {
				laser.position.x = startPosition.x;
				laser.position.y = startPosition.y;
				laser.position.z = startPosition.z;
			});
			tween.start();
			scene.add(laser);
		}
	});
});