<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EventRequest;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class EventController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $events = Event::orderBy('id')->get();

        return EventResource::collection($events);
    }

    /**
     * @param \App\Http\Requests\EventRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(EventRequest $request): JsonResponse
    {
//        $user = $request->user();

        $event = Event::create([
            'user_id' => 1,
            'title' => $request->title,
            'description' => $request->description,
            'coauthor' => $request->coauthor,
            'address' => $request->address,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'is_privacy' => make_boolean($request->is_privacy),
            'confirm_user' => make_boolean($request->confirm_user),
            'comment_allowed' => make_boolean($request->comment_allowed),
            'chat_allowed' => make_boolean($request->chat_allowed),
            'photos_allowed' => make_boolean($request->photos_allowed),
            'count_seats' => $request->count_seats,
            'sex' => $request->sex,
            'date' => $request->date,
            ]
        );

        if ($request->hasFile('photo')) {
            $event->addMedia($request->photo)->toMediaCollection('photo');
        }

        if ($request->photos) {
            foreach ($request->file('photos', []) as $file) {
                $event->mediaSave($file,'photos');
            }
        }

        return response()->json([
            'message' => 'Event save',
            'data' => EventResource::make($event)
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * @param Event $event
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Event $event)
    {
        $event->delete();

        return response()
            ->json(['message' => 'Event destroy'], Response::HTTP_ACCEPTED);
    }
}
