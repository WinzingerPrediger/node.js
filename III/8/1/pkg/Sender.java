package pkg;

import org.vertx.java.core.Handler;
import org.vertx.java.core.eventbus.EventBus;
import org.vertx.java.core.eventbus.Message;
import org.vertx.java.platform.Verticle;
import org.vertx.java.core.buffer.Buffer;

import java.io.ByteArrayOutputStream;
import java.io.ObjectOutputStream;
import java.io.ObjectOutput;
import java.io.IOException;

import pkg.MyType;

public class Sender extends Verticle {
	public void start() {
        EventBus eb = vertx.eventBus();

        Handler<Message<String>> myResponseHandler = new Handler<Message<String>>() {
          public void handle(Message<String> message) {
            System.out.println("received response: "+message.body());
          }
        };

        eb.send("test.address", new Buffer(serializeObject(new MyType("hello, world!"))), myResponseHandler);
        System.out.println("message sent");
    }

    private byte[] serializeObject(Object obj) {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
    	  ObjectOutput out = null;
		    try {
  			    out = new ObjectOutputStream(bos);   
  			    out.writeObject(obj);
  			    byte[] ba = bos.toByteArray();
  			    out.close();
  			    bos.close();
  			    return ba;
		    } catch (IOException ioe) {
			      throw new RuntimeException(ioe);
		    }
    }
}
