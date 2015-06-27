package pkg;

import org.vertx.java.core.Handler;
import org.vertx.java.core.eventbus.EventBus;
import org.vertx.java.core.eventbus.Message;
import org.vertx.java.platform.Verticle;
import org.vertx.java.core.buffer.Buffer;

import java.io.ByteArrayInputStream;
import java.io.ObjectInput;
import java.io.ObjectInputStream;
import java.io.IOException;

import pkg.MyType;

public class Receiver extends Verticle {
	public void start() {
        EventBus eb = vertx.eventBus();

        Handler<Message<Buffer>> myTypeHandler = new Handler<Message<Buffer>>() {
        	public void handle(Message<Buffer> message) {
        		MyType myType = deserializeObject(message.body().getBytes());
        		System.out.println("received MyType-message: "+myType);
            message.reply("received '"+myType+"'");
        	}
        };
     
        eb.registerHandler("test.address", myTypeHandler);
        System.out.println("receiver ready");
    }

    private MyType deserializeObject(byte[] ba) {
    	  ByteArrayInputStream bis = new ByteArrayInputStream(ba);
		    ObjectInput in = null;
		    try {
  		    	in = new ObjectInputStream(bis);
  			    Object obj = in.readObject(); 
			      bis.close();
  			    in.close();
  			    return (MyType)obj;
		    } catch (Exception ioe) {
			      throw new RuntimeException(ioe);
		    }
    }
}