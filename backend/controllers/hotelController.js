import {
  AdditionalPax,
  VisitOfPurpose,
  IdProof,
  FoodPlan,
} from "../models/hotelSubMasterModal.js";

import Booking from "../models/bookingModal.js";
import hsnModel from "../models/hsnModel.js";
import roomModal from "../models/roomModal.js";
import {buildDatabaseFilterForRoom , sendRoomResponse ,fetchRoomsFromDatabase} from "../helpers/hotelHelper.js"
import {extractRequestParams} from "../helpers/productHelper.js"
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

// function used to save additional pax details
export const saveAdditionalPax = async (req, res) => {
  try {
    const { additionalPaxName, amount } = req.body;
    const { cmp_id } = req.params;
    console.log(req.owner);
    const generatedId = new mongoose.Types.ObjectId();
    const newPax = new AdditionalPax({
      _id: generatedId,
      additionalPaxName,
      amount,
      additionalPaxId: generatedId,
      cmp_id,
      Primary_user_id: req.pUserId || req.owner,
    });

    const result = await newPax.save();
    return res.status(201).json({
      message: "Additional Pax saved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error saving additional pax:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// function used to fetch additional pax details
export const getAdditionalPax = async (req, res) => {
  console.log(req.params);
  try {
    const { cmp_id } = req.params;
    const primaryUserId = req.pUserId || req.owner;

    if (!cmp_id || !primaryUserId) {
      return res.status(400).json({
        message: "Missing required parameters: cmp_id or Primary_user_id",
      });
    }

    const additionalPax = await AdditionalPax.find({
      cmp_id,
      Primary_user_id: primaryUserId,
    });

    return res.status(200).json({
      message: "Additional Pax fetched successfully",
      data: additionalPax,
    });
  } catch (error) {
    console.error("Error fetching Additional Pax:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// function used to edit additional pax
export const updateAdditionalPax = async (req, res) => {
  try {
    const { additionalPaxName, amount, id } = req.body;
    console.log(req.body);
    const { cmp_id } = req.params;

    const updatedPax = await AdditionalPax.findOneAndUpdate(
      { id, cmp_id },
      {
        $set: {
          additionalPaxName,
          amount,
        },
      },
      { new: true }
    );
    if (!updatedPax) {
      return res.status(404).json({
        message: "Additional Pax not found",
      });
    }

    return res.status(200).json({
      message: "Additional Pax updated successfully",
      data: updatedPax,
    });
  } catch (error) {
    console.error("Error updating additional pax:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//function used to handle delete data

export const deleteAdditionalPax = async (req, res) => {
  console.log("welcome");
  try {
    const { cmp_id, id } = req.params;
    console.log(req.params);

    // Validate input
    if (!cmp_id || !id) {
      return res.status(400).json({
        message: "Company ID and Additional Pax ID are required.",
      });
    }

    // Attempt to delete the document
    const result = await AdditionalPax.deleteOne({ _id: id, cmp_id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Additional Pax not found or already deleted.",
      });
    }

    return res.status(200).json({
      message: "Additional Pax deleted successfully.",
    });
  } catch (error) {
    console.log("Error deleting Additional Pax:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// function used to save visit of purpose
export const saveVisitOfPurpose = async (req, res) => {
  try {
    const { visitOfPurpose } = req.body;
    const { cmp_id } = req.params;
    const generatedId = new mongoose.Types.ObjectId();
    const newVisitOfPurpose = new VisitOfPurpose({
      _id: generatedId,
      visitOfPurpose,
      visitOfPurposeId: generatedId,
      cmp_id,
      Primary_user_id: req.pUserId || req.owner,
    });

    const result = await newVisitOfPurpose.save();
    return res.status(201).json({
      message: "Visit of purpose saved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error saving  visit of purpose:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// function used to fetch visit of purpose
export const getVisitOfPurpose = async (req, res) => {
  try {
    const { cmp_id } = req.params;
    const primaryUserId = req.pUserId || req.owner;

    if (!cmp_id || !primaryUserId) {
      return res.status(400).json({
        message: "Missing required parameters: cmp_id or Primary_user_id",
      });
    }

    const visitOfPurpose = await VisitOfPurpose.find({
      cmp_id,
      Primary_user_id: primaryUserId,
    });

    return res.status(200).json({
      message: "Visit of purpose fetched successfully",
      data: visitOfPurpose,
    });
  } catch (error) {
    console.error("Error fetching Additional Pax:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// function used to update visit of purpose
export const updateVisitOfPurpose = async (req, res) => {
  try {
    const { visitOfPurpose, visitOfPurposeId } = req.body;
    const { cmp_id } = req.params;

    if (!ObjectId.isValid(visitOfPurposeId) || !ObjectId.isValid(cmp_id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const updatedVisitOfPurpose = await VisitOfPurpose.findOneAndUpdate(
      {
        _id: new ObjectId(visitOfPurposeId),
        cmp_id: new ObjectId(cmp_id),
      },
      {
        $set: {
          visitOfPurpose,
        },
      },
      { new: true }
    );

    if (!updatedVisitOfPurpose) {
      return res.status(404).json({
        message: "Visit of purpose not found",
      });
    }

    return res.status(200).json({
      message: "Visit of purpose updated successfully",
      data: updatedVisitOfPurpose,
    });
  } catch (error) {
    console.error("Error updating visit of purpose:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// function used to delete visit of purpose data

export const deleteVisitOfPurpose = async (req, res) => {
  try {
    const { cmp_id, id } = req.params;

    // Validate input
    if (!cmp_id || !id) {
      return res.status(400).json({
        message: "Company ID and Visit of purpose ID are required.",
      });
    }

    // Attempt to delete the document
    const result = await VisitOfPurpose.deleteOne({ _id: id, cmp_id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Visit of purpose not found or already deleted.",
      });
    }

    return res.status(200).json({
      message: "Visit of purpose deleted successfully.",
    });
  } catch (error) {
    console.log("Error deleting visit of purpose:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// function used to save id proof
export const saveIdProof = async (req, res) => {
  try {
    const { idProof } = req.body;
    const { cmp_id } = req.params;
    const generatedId = new mongoose.Types.ObjectId();
    const newIdProof = new IdProof({
      _id: generatedId,
      idProof,
      idProofId: generatedId,
      cmp_id,
      Primary_user_id: req.pUserId || req.owner,
    });

    const result = await newIdProof.save();
    return res.status(201).json({
      message: "Id proof saved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error saving  id proof:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// function used to fetch id proof

export const getIdProof = async (req, res) => {
  try {
    const { cmp_id } = req.params;
    const primaryUserId = req.pUserId || req.owner;

    if (!cmp_id || !primaryUserId) {
      return res.status(400).json({
        message: "Missing required parameters: cmp_id or Primary_user_id",
      });
    }

    const idProofData = await IdProof.find({
      cmp_id,
      Primary_user_id: primaryUserId,
    });

    return res.status(200).json({
      message: "Id proof fetched successfully",
      data: idProofData,
    });
  } catch (error) {
    console.error("Error fetching Additional Pax:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// function used to update id proof
export const updateIdProof = async (req, res) => {
  try {
    const { idProof, idProofId } = req.body;
    console.log(req.body);
    const { cmp_id } = req.params;

    if (!ObjectId.isValid(idProofId) || !ObjectId.isValid(cmp_id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const updateIdProof = await IdProof.findOneAndUpdate(
      {
        _id: new ObjectId(idProofId),
        cmp_id: new ObjectId(cmp_id),
      },
      {
        $set: {
          idProof,
        },
      },
      { new: true }
    );

    if (!updateIdProof) {
      return res.status(404).json({
        message: "Id proof data not found",
      });
    }

    return res.status(200).json({
      message: "Id proof updated successfully",
      data: updateIdProof,
    });
  } catch (error) {
    console.error("Error updating id proof:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// function used to delete id proof data

export const deleteIdProof = async (req, res) => {
  try {
    const { cmp_id, id } = req.params;

    // Validate input
    if (!cmp_id || !id) {
      return res.status(400).json({
        message: "Company ID and Id proof ID are required.",
      });
    }

    // Attempt to delete the document
    const result = await IdProof.deleteOne({ _id: id, cmp_id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Id proof data not found or already deleted.",
      });
    }

    return res.status(200).json({
      message: "Id proof deleted successfully.",
    });
  } catch (error) {
    console.log("Error deleting id proof:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// function used to save food plan
export const saveFoodPlan = async (req, res) => {
  try {
    const { foodPlan, amount } = req.body;
    const { cmp_id } = req.params;
    console.log(req.owner);
    const generatedId = new mongoose.Types.ObjectId();
    const newFoodPlan = new FoodPlan({
      _id: generatedId,
      foodPlan,
      amount,
      foodPlanId: generatedId,
      cmp_id,
      Primary_user_id: req.pUserId || req.owner,
    });

    const result = await newFoodPlan.save();
    return res.status(201).json({
      message: "Food plan saved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error saving food plan:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// function used to get food plan details

export const getFoodPlan = async (req, res) => {
  try {
    const { cmp_id } = req.params;
    const primaryUserId = req.pUserId || req.owner;

    if (!cmp_id || !primaryUserId) {
      return res.status(400).json({
        message: "Missing required parameters: cmp_id or Primary_user_id",
      });
    }

    const foodPlans = await FoodPlan.find({
      cmp_id,
      Primary_user_id: primaryUserId,
    });

    return res.status(200).json({
      message: "Food plan fetched successfully",
      data: foodPlans,
    });
  } catch (error) {
    console.error("Error fetching Additional Pax:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//function used to update food plan
export const updateFoodPlan = async (req, res) => {
  try {
    const { foodPlan, amount, foodPlanId } = req.body;

    const { cmp_id } = req.params;

    const updatedFoodPlan = await FoodPlan.findOneAndUpdate(
      { _id: foodPlanId, cmp_id },
      {
        $set: {
          foodPlan,
          amount,
        },
      },
      { new: true }
    );
    if (!updatedFoodPlan) {
      return res.status(404).json({
        message: "Food plan  not found",
      });
    }

    return res.status(200).json({
      message: "Food plan updated successfully",
      data: updatedFoodPlan,
    });
  } catch (error) {
    console.error("Error updating food plan:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// function used to delete food plan data

export const deleteFoodPlan = async (req, res) => {
  try {
    const { cmp_id, id } = req.params;

    // Validate input
    if (!cmp_id || !id) {
      return res.status(400).json({
        message: "Company ID and Visit of purpose ID are required.",
      });
    }

    // Attempt to delete the document
    const result = await FoodPlan.deleteOne({ _id: id, cmp_id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Food plan not found or already deleted.",
      });
    }

    return res.status(200).json({
      message: "Food plan deleted successfully.",
    });
  } catch (error) {
    console.log("Error deleting food plan:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// function used to save room details

export const addRoom = async (req, res) => {
  const session = await mongoose.startSession(); // Step 1: Start session

  try {
    const { formData, tableData } = req.body;

    session.startTransaction(); // Step 2: Start transaction

    // Step 3: Fetch HSN data inside the session
    const correspondingHsn = await hsnModel
      .findOne({ _id: formData.hsn })
      .session(session);
    if (!correspondingHsn) {
      await session.abortTransaction();
      return res.status(400).json({ message: "HSN data missing" });
    }

    // Step 4: Create Room document
    const newRoom = new roomModal({
      primary_user_id: req.pUserId || req.owner,
      secondary_user_id: req.sUserId,
      cmp_id: req.params.cmp_id,
      roomName: formData.roomName,
      roomType: formData.roomType,
      bedType: formData.bedType,
      unit: formData.unit,
      roomFloor: formData.roomFloor,
      hsn: formData.hsn,
      priceLevel: tableData,
    });

    // Step 5: Save using session
    await newRoom.save({ session });

    // Step 6: Commit the transaction
    await session.commitTransaction();

    res.status(201).json({ message: "Room Added Successfully", data: newRoom });
  } catch (error) {
    console.log("Error saving room details:", error);

    // Rollback on error
    await session.abortTransaction();

    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  } finally {
    // Step 7: Always end session
    session.endSession();
  }
};

// function used to fetch rooms
export const getRooms = async (req, res) => {
  try {
    const params = extractRequestParams(req);
    const filter = buildDatabaseFilterForRoom(params);
    console.log("filter",filter)
    const {rooms,totalRooms} = await fetchRoomsFromDatabase(filter, params);
    console.log("rooms",rooms);
    const sendRoomResponseData = sendRoomResponse(res, rooms, totalRooms, params);
  } catch (error) {
    console.error("Error in getProducts:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again!",
    });
  }
};

// Helper function to extract request parameters


// Helper function to send room response

// Main controller function




export const getAllRooms = async (req, res) => {
  try {
    const { cmp_id } = req.params;
    
    // Validate company ID
    if (!cmp_id) {
      return res.status(400).json({
        success: false,
        message: "Company ID is required"
      });
    }

    // Validate if cmp_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(cmp_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Company ID format"
      });
    }

    // Fetch all rooms for the company
    const rooms = await roomModal.find({
      cmp_id: cmp_id, // MongoDB will automatically cast valid ObjectId strings
    })
    .populate('cmp_id', 'name') // Populate organization details
    .populate('roomType') // Populate from brand collection
    .populate('roomFloor') // Populate from subCategory collection  
    .populate('bedType') // Populate from category collection
    .populate('priceLevel.priceLevel', 'name') // Populate price level details
    .sort({ roomName: 1 }) // Sort by room name (roomNumber doesn't exist in schema)
    .lean(); // Use lean() for better performance

    return res.status(200).json({
      success: true,
      message: "Rooms fetched successfully",
      data: {
        rooms
      }
    });

  } catch (error) {
    console.error("Error in getAllRooms:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again!",
      data: []
    });
  }
};





// function used to edit room details

export const editRoom = async (req, res) => {
  const session = await mongoose.startSession(); // Step 1: Start a session

  try {
    const { formData, tableData } = req.body;

    // Step 2: Start the transaction
    session.startTransaction();

    // Step 3: Validate HSN existence within session
    const correspondingHsn = await hsnModel
      .findOne({ _id: formData.hsn })
      .session(session);

    if (!correspondingHsn) {
      await session.abortTransaction();
      return res.status(400).json({ message: "HSN data missing" });
    }

    // Step 4: Update room using session
    const updatedRoom = await roomModal.findOneAndUpdate(
      { _id: req.params.id, cmp_id: req.params.cmp_id },
      {
        $set: {
          roomName: formData.roomName,
          roomType: formData.roomType,
          bedType: formData.bedType,
          roomFloor: formData.roomFloor,
          hsn: formData.hsn,
          unit: formData.unit,
          priceLevel: tableData,
        },
      },
      { new: true, session } // Important: pass session in options
    );

    if (!updatedRoom) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Room not found" });
    }

    // Step 5: Commit the transaction
    await session.commitTransaction();

    res.status(200).json({ message: "Room data updated successfully" });
  } catch (error) {
    console.error("Error saving room details:", error);

    // Step 6: Abort on error
    await session.abortTransaction();

    res.status(500).json({ message: "Internal Server Error", error: error.message });
  } finally {
    // Step 7: Always end the session
    session.endSession();
  }
};


// function used to delete room

export const deleteRoom = async (req, res) => {
  const roomId = req.params.id;

  try {
    const deletedRoom = await roomModal.findByIdAndDelete(roomId);
    if (deletedRoom) {
      return res.status(200).json({
        success: true,
        message: "Room deleted successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again!",
    });
  }
};


// function used for room booking

export const roomBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    const orgId = req.params.orgId;
    let voucherNumber = await generateVoucherNumber(
        await generateVoucherNumber(orgId, voucherType, series_id, session ))
  
    if (!bookingData.bookingNumber || !bookingData.arrivalDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newBooking = new Booking(bookingData);
    const savedBooking = await newBooking.save();

    res.status(201).json({
      message: "Booking saved successfully",
      data: savedBooking,
    });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
